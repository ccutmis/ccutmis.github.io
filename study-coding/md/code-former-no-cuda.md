# CodeFormer AI 视频、图片修复 安装设置教程(無CUDA核心)

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
建議使用 intel CPU(四代i3以上)

-----

## 2. 安裝軟體:
1. Python 3.7+
	* python安裝前先到 windows設定裡面的"應用程式"-> "應用程式別名" 把 python 跟 python3 設為關閉
	* 在 `https://www.python.org/downloads/release/python-379/` 下載 Windows x86-64 executable installer
	* 下載連結： `https://www.python.org/ftp/python/3.7.9/python-3.7.9-amd64.exe`
	* 安裝時記得勾選"*Add Python3.7 to PATH*" 然後按 *Install Now* 即可。
2. Git 
	* 下載連結： `https://github.com/git-for-windows/git/releases/download/v2.39.0.windows.2/Git-2.39.0.2-64-bit.exe`
	* 依照標準安裝即可。
3. 安裝 Microsoft Visual C++ 可轉散發套件 
	* 下載連結： `https://aka.ms/vs/16/release/vc_redist.x64.exe`
	(電腦沒有獨立顯卡驅動要安裝這個，不然後面會出錯)

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
4. 輸入 `git clone https://github.com/sczhou/CodeFormer` 按[enter]
5. 輸入 `cd CodeFormer` 按[enter]
6. 輸入 `pip install -r requirements.txt -q` 按[enter]
7. 輸入 `pip install -q gradio` 按[enter]
8. 輸入 `python basicsr/setup.py develop` 按[enter]
9. 輸入 `python scripts/download_pretrained_models.py facelib` 按[enter]
10. 開啟檔案總管，把要處理的圖檔放到 C:\CodeFormer\inputs\cropped_faces 裡面
	* (原作者在裡面放了20張測試用圖檔，所以這步驟可以略過)
11. 在 cmd裡輸入 `python inference_codeformer.py -w 0.5 --has_aligned --input_path C:\CodeFormer\inputs\cropped_faces` 按[enter] ，然後你就會看到 cmd 開始裝忙，不用理它等它跑完。
12. 開啟檔案總管，到 `C:\CodeFormer\results` 資料夾就可以看到剛才的勞動成果

-----

## 5. CodeFormer AI 命令參考 :
* 面部修复（裁剪和对齐的面部）
	* `python inference_codeformer.py -w 0.5 --has_aligned --input_path [input folder]`
* 整体图像增强
	* `python inference_codeformer.py -w 0.7 --input_path [image folder/image path]`
* 视频增强(`無CUDA核心不建議測試這個項目`)
	* `python inference_codeformer.py --bg_upsampler realesrgan --face_upsample -w 1.0 --input_path [video path]`

