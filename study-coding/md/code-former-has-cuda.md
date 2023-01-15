# CodeFormer AI 视频、图片修复 安装设置教程(有CUDA核心)

原始影片教程: [https://www.youtube.com/watch?v=iSBqyVWTqhU](https://www.youtube.com/watch?v=iSBqyVWTqhU)

-----

## 目錄
1. 硬件配置
2. 安裝軟體
3. 驗證 Python 與 Git 是否安裝完成
4. 執行步驟
5. CodeFormer AI 命令參考

-----

## 1. 硬件配置:
* intel CPU(四代i3以上)
* 支援CUDA核心運算的Nvidia顯卡

-----

## 2. 安裝軟體:
1. 在google 搜 "CUDA 11.6 DRIVER DOWNLOAD" 找到NV官方的CUDA Toolkit 11.6 版本安裝
2. Python 3.7+
	* python安裝前先到 windows設定裡面的"應用程式"-> "應用程式別名" 把 python 跟 python3 設為關閉
	* 在 `https://www.python.org/downloads/release/python-379/` 下載 Windows x86-64 executable installer
	* 下載連結： `https://www.python.org/ftp/python/3.7.9/python-3.7.9-amd64.exe`
	* 安裝時記得勾選"*Add Python3.7 to PATH*" 然後按 *Install Now* 即可。
3. Git 
	* 下載連結： `https://github.com/git-for-windows/git/releases/download/v2.39.0.windows.2/Git-2.39.0.2-64-bit.exe`
	* 依照標準安裝即可。
4. 安裝 Microsoft Visual C++ 可轉散發套件 
	* 下載連結： `https://aka.ms/vs/16/release/vc_redist.x64.exe`

-----

## 3. 驗證 Python 與 Git 是否安裝完成:

* 按[win]+[R] 在"執行"輸入 `cmd` 開啟命令提示字元(後續稱 cmd )
* 在終端機輸入 `git --version`
	* 若Git安裝成功會顯示 `git version 2.39.0.windows.2`
* 在終端機輸入 `python --version`
	* 若Git安裝成功會顯示 `Python 3.7.9`

-----

## 4. 執行步驟:
1. 按[win]+[R] 在"執行"輸入 `cmd` 然後按 [enter]
2. 在cmd裡輸入 `cd /` 按[enter] 切換到 C槽根目錄
3. 輸入 `python -m pip install --upgrade pip` 按[enter] 
4. 輸入 `pip install torch==1.12.1+cu116 torchvision==0.13.1+cu116 torchaudio==0.12.1 --extra-index-url https://download.pytorch.org/whl/cu116` 按[enter]
	* 說明： 解決 Pytorch 跟 CUDA 衝突的問題 
	* 參考網址： https://pytorch.org/get-started/previous-versions/
5. 輸入 `python` 按 [Enter] 進入 python 交談介面並輸入下列內容驗證torch是否能抓到CUDA
	* `import torch` [Enter]
	* `print(torch.cuda.is_available())` [Enter]
	* 若返回值是 `True 為成功`，若返回值是 `False 表示有問題` 要想辦法排除(自行Google Search)再進行後續步驟。
6. 輸入 `git clone https://github.com/sczhou/CodeFormer` 按[enter]
7. 輸入 `cd CodeFormer` 按[enter]
8. 輸入 `pip install -r requirements.txt -q` 按[enter]
9. 輸入 `pip install -q gradio` 按[enter]
10. 輸入 `python basicsr/setup.py develop` 按[enter]
11. 輸入 `python scripts/download_pretrained_models.py facelib` 按[enter]
12. 開啟檔案總管，把要處理的圖檔放到 C:\CodeFormer\inputs\cropped_faces 裡面
	* (原作者在裡面放了20張測試用圖檔，所以這步驟可以略過)
13. 在 cmd裡輸入 `python inference_codeformer.py -w 0.5 --has_aligned --input_path C:\CodeFormer\inputs\cropped_faces` 按[enter] ，然後你就會看到 cmd 開始裝忙，不用理它等它跑完。(這時可以打開工作管理員切到"效能"分頁，若CUDA有在運作GPU%應該會比CPU高很多)
12. 開啟檔案總管，到 `C:\CodeFormer\results` 資料夾就可以看到剛才的勞動成果

-----

## 5. CodeFormer AI 命令參考 :
* 面部修复（裁剪和对齐的面部）
	* `python inference_codeformer.py -w 0.5 --has_aligned --input_path [input folder]`
* 整体图像增强
	* `python inference_codeformer.py -w 0.7 --input_path [image folder/image path]`
* 视频增强
	* `python inference_codeformer.py --bg_upsampler realesrgan --face_upsample -w 1.0 --input_path [video path]`

