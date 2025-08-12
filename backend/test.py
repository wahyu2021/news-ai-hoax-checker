import torch
from torch.serialization import set_default_load_endianness
print("CUDA Available:", torch.cuda.is_available())
print("CUDA Device Count:", torch.cuda.device_count())
print("Current Device:", torch.cuda.current_device() if torch.cuda.is_available() else "No CUDA")
print("Device Name:", torch.cuda.get_device_name(0) if torch.cuda.is_available() else "None")
print("Torch Version:", torch.__version__)

print("Hello World")
print("Hallo Cantik")

