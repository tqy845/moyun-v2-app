use reqwest::blocking::Client;
use std::fs::{self, File, OpenOptions};
use std::io::{self, Write};
use std::path::Path;
use tauri::{Manager, Runtime};
use window_shadows::set_shadow;

pub fn set_window_shadow<R: Runtime>(app: &tauri::App<R>) {
    let window = app.get_window("customization").unwrap();
    set_shadow(&window, true).expect("Unsupported platform!");
}

#[tauri::command]
pub fn download_file(url: &str, file_name: &str, token: &str) -> Result<String, String> {
    let client = Client::new();
    let mut request = client.get(url);
    request = request.header("Authorization", format!("Bearer {}", token));

    let mut response = request.send().map_err(|e| e.to_string())?;

    if !response.status().is_success() {
        return Err(format!(
            "Download failed with status code: {}",
            response.status()
        ));
    }

    let output_path = format!("C:/Users/64466/Desktop/{}", file_name);
    let mut out_file = File::create(output_path).map_err(|e| e.to_string())?;

    io::copy(&mut response, &mut out_file).map_err(|e| e.to_string())?;

    Ok(format!("{} Download completed", file_name))
}

#[tauri::command]
pub fn merge_chunks(chunk_paths: Vec<String>, output_path: &str) -> Result<(), String> {
    let output_path = Path::new("C:/Users/64466/Desktop/").join(output_path);
    let mut output_file = OpenOptions::new()
        .create(true)
        .write(true)
        .open(&output_path)
        .map_err(|e| e.to_string())?;

    for chunk_path in chunk_paths {
        let chunk_path = Path::new("C:/Users/64466/Desktop/").join(&chunk_path);
        let mut chunk_file = File::open(&chunk_path).map_err(|e| e.to_string())?;

        io::copy(&mut chunk_file, &mut output_file).map_err(|e| e.to_string())?;

        fs::remove_file(&chunk_path).map_err(|e| e.to_string())?;
    }

    Ok(())
}

/**
 * 下载并合并
 */
#[tauri::command]
pub fn download_and_merge_chunks(
    chunk_names: Vec<String>,
    file_name: &str,
    token: &str,
) -> Result<String, String> {
    let mut chunk_paths = Vec::new();
    for file_name in &chunk_names {
        let url = format!("http://localhost/system/user/file/chunk/{}", file_name);
        download_file(&url, file_name, token)?;

        chunk_paths.push(file_name.clone());
    }

    merge_chunks(chunk_paths, file_name)?;

    Ok("Download and merge completed".to_string())
}

/**
 * 保存到本地磁盘
 */
#[tauri::command]
pub fn write_u8_array_to_file(data: Vec<u8>, file_path: &str) -> Result<(), String> {
    let mut file = File::create(file_path).map_err(|e| e.to_string())?;

    file.write_all(&data).map_err(|e| e.to_string())?;

    Ok(())
}
