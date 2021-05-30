from keras.models import load_model, save_model

model = load_model(
    r'C:\Users\abdul\Desktop\isee-web\dr_model\DR_14.h5', compile=True)
print(model.summary())
