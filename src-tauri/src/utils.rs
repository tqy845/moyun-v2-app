use reqwest::blocking::{Client, RequestBuilder};
use std::fs::File;
use std::io::{self, Write};
use tauri::{Manager, Runtime};
use window_shadows::set_shadow;

pub fn set_window_shadow<R: Runtime>(app: &tauri::App<R>) {
    let window = app.get_window("customization").unwrap();
    set_shadow(&window, true).expect("Unsupported platform!");
}

#[tauri::command]
pub fn download_file() -> Result<String, String> {
    // 使用reqwest库下载文件
    let url = "http://localhost/system/user/file/chunk/免费商用中文字体集.rar.part1";
    let client = Client::new();
    let mut request: RequestBuilder = client.get(url);

    // 添加令牌到请求头
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjczMGZjNGY5LTBlMWEtNDdmZi05MTcxLWJiMWFhOWNiZDQ1MCJ9.nBejbJcA2CSk09XTc-YyYIXhBLi_1NaGfpom34cs86eXEg9yjl1SSjez4VVSucBny4SasdfYh5J34MT4XbvNVA";
    request = request.header("Authorization", format!("Bearer {}", token));

    let mut response = request.send().map_err(|e| e.to_string())?;

    // 检查响应是否成功
    if !response.status().is_success() {
        return Err(format!(
            "Download failed with status code: {}",
            response.status()
        ));
    }

    // 创建一个新的文件，文件名为"file.rar.part1"
    let mut out_file = File::create("file.rar.part1").map_err(|e| e.to_string())?;

    // 将下载的文件内容写入到本地文件
    response.copy_to(&mut out_file).map_err(|e| e.to_string())?;

    Ok(format!("Download completed"))
}
