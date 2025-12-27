import os

image_names=os.listdir("./media/dump")
copy_this="["+",".join([f'"{img_name}"' for img_name in image_names])+"]"
print(copy_this)