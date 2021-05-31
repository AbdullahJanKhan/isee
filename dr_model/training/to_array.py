import time

import numpy as np
import pandas as pd

from PIL import Image


def change_image_name(df, column):
    """
    Appends the suffix '.jpeg' for all image names in the DataFrame

    INPUT
        df: Pandas DataFrame, including columns to be altered.
        column: The column that will be changed. Takes a string input.

    OUTPUT
        Pandas DataFrame, with a single column changed to include the
        aforementioned suffix.
    """
    return [i + '.jpeg' for i in df[column]]


def resize_image(file_path, df):
    new_path = r'./Data/train_resize_256/'
    for image_name in df['image']:
        image = Image.open(file_path + image_name)
        image = image.resize((256, 256))
        image.save(new_path+image_name)
        image.close()


def convert_images_to_arrays_train(file_path, df):
    """
    Converts each image to an array, and appends each array to a new NumPy
    array, based on the image column equaling the image file name.

    INPUT
        file_path: Specified file path for resized test and train images.
        df: Pandas DataFrame being used to assist file imports.

    OUTPUT
        NumPy array of image arrays.
    """

    lst_imgs = [l for l in df['image']]
    array = []
    for img_name in lst_imgs:
        img = Image.open(file_path + img_name)
        array.append(np.array(img))
        img.close()

    return np.array(array)


def save_to_array(arr_name, arr_object):
    """
    Saves data object as a NumPy file. Used for saving train and test arrays.

    INPUT
        arr_name: The name of the file you want to save.
            This input takes a directory string.
        arr_object: NumPy array of arrays. This object is saved as a NumPy file.

    OUTPUT
        NumPy array of image arrays
    """
    return np.save(arr_name, arr_object)


if __name__ == '__main__':
    start_time = time.time()

    labels = pd.read_csv(r"./Data/train_master_final.csv")
    new_labels_no_dr = labels[labels['level'] == 0][30000:45000]
    new_labels_dr = labels[labels['level'] == 1][30000:45000]

    new_labels = np.vstack((new_labels_no_dr, new_labels_dr))
    new_labels = np.delete(new_labels, np.s_[0], axis=1)

    data_for_array = pd.DataFrame(new_labels, columns=['image', 'level'])
    data_for_array.to_csv(r'./Data/X_train_labels_3045.csv')
    # print("Resizing to 256 X 256") no use
    # # resize_image(r'./Data/train/', labels)

    print("Writing Train Array")
    X_train = convert_images_to_arrays_train(
        r'./Data/train_resize_256/', data_for_array)

    print(X_train.shape)

    print("Saving Train Array")
    save_to_array(r'./Data/X_train_3045.npy', X_train)

    print("--- %s seconds ---" % (time.time() - start_time))
