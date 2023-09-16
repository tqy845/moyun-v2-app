#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Result;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn save_octet_stream_data(data: &[u8]) -> Result<()> {
    use std::fs::File;
    use std::io::Write;

    // 创建或打开本地文件
    let mut file = File::create("output.bin")?;

    // 将数据写入文件
    file.write_all(data)?;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, save_octet_stream_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
