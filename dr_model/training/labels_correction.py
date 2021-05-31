import pandas as pd
import numpy as np
from keras.models import load_model
if __name__ == '__main__':
    model = load_model(r'./models/DR_14.h5')
    print(model.summary())
