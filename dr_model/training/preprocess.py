import time
import numpy as np
import pandas as pd
from PIL import Image
import random

def find_black_images(file_path, df):
    """
    Creates a column of images that are not black (np.mean(img) != 0)

    INPUT
        file_path: file_path to the images to be analyzed.
        df: Pandas DataFrame that includes all labeled image names.
        column: column in DataFrame query is evaluated against.

    OUTPUT
        Column indicating if the photo is pitch black or not.
    """

    lst_imgs = [l for l in df['image']]
    return [1 if np.mean(np.array(Image.open(file_path + img))) == 0 else 0 for img in lst_imgs]


if __name__ == '__main__':
    print(random.random())
    # start_time = time.time()
    # trainLabels = pd.read_csv(
    #     r'C:\Users\H.A.R\Desktop\FYP\isee-dr-model\Data\trainLabels.csv')

    # trainLabels['image'] = [i + '.jpeg' for i in trainLabels['image']]
    # trainLabels['black'] = np.nan

    # trainLabels['black'] = find_black_images(
    #     r'C:\Users\H.A.R\Desktop\FYP\isee-dr-model\Data\train\\', trainLabels)
    # trainLabels = trainLabels.loc[trainLabels['black'] == 0]
    # trainLabels.to_csv(r'C:\Users\H.A.R\Desktop\FYP\isee-dr-model\Data\trainLabels_master.csv',
    #                    index=False, header=True)

    # print("Completed")
    # print("--- %s seconds ---" % (time.time() - start_time))
