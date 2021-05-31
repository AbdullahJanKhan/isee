import pandas as pd
import numpy as np
from skimage import io
from skimage.transform import rotate
import cv2
import os
import time

ext = '.jpeg'


def rotate_images(file_path, degrees_of_rotation, lst_imgs):
    '''
    Rotates image based on a specified amount of degrees

    INPUT
        file_path: file path to the folder containing images.
        degrees_of_rotation: Integer, specifying degrees to rotate the
        image. Set number from 1 to 360.
        lst_imgs: list of image strings.

    OUTPUT
        Images rotated by the degrees of rotation specififed.
    '''
    new_img_lis = []
    for l in lst_imgs:
        img = io.imread(file_path + str(l))
        for deg in degrees_of_rotation:
            img = rotate(img, deg)
            f_name = file_path + str(l).rstrip(ext) + '_' + str(deg) + ext
            io.imsave(f_name, img)
            new_img_lis.append(f_name)
    return new_img_lis


def mirror_images(file_path, mirror_direction, lst_imgs):
    '''
    Mirrors image left or right, based on criteria specified.

    INPUT
        file_path: file path to the folder containing images.
        mirror_direction: criteria for mirroring left or right.
        lst_imgs: list of image strings.

    OUTPUT
        Images mirrored left or right.
    '''
    new_img_lis = []

    for l in lst_imgs:
        img = cv2.imread(file_path + str(l))
        img = cv2.flip(img, mirror_direction)
        f_name = file_path + str(l).rstrip(ext) + '_mir' + ext
        cv2.imwrite(f_name, img)
        new_img_lis.append(f_name)
    return new_img_lis


if __name__ == '__main__':
    start_time = time.time()
    print(os.listdir(r'./Data'))
    trainLabels = pd.read_csv(r"./Data/trainLabels_master_v2.csv")

    # trainLabels['image'] = trainLabels['image'].str.rstrip('.jpeg') tesing
    trainLabels_no_DR = trainLabels[trainLabels['level'] == 0]
    trainLabels_DR = trainLabels[trainLabels['level'] >= 1]

    path = r'./Data/train_cp/'

    lst_imgs_no_DR = [i for i in trainLabels_no_DR['image']]
    lst_imgs_DR = [i for i in trainLabels_DR['image']]

    # lst_sample = [i for i in os.listdir('../data/sample/') if i != '.DS_Store'] test
    # lst_sample = [str(l.strip('.jpeg')) for l in lst_sample] test

    # Mirror Images with no DR one time
    print("Mirroring Non-DR Images")
    lst_imgs_no_DR.extend(mirror_images(path, 1, lst_imgs_no_DR))

    # Rotate all images that have any level of DR
    lst_imgs_DR_temp = []
    print("Rotating DR images to 70, 100, 160 and 250 Degrees")
    lst_imgs_DR_temp.extend(rotate_images(
        path, [70, 100, 160, 250], lst_imgs_DR))

    print("Mirroring DR Images")
    lst_imgs_DR_temp.extend(mirror_images(path, 0, lst_imgs_DR))

    lst_imgs_DR.extend(lst_imgs_DR_temp)

    print("Updating the CSV Index")

    lst_imgs_no_DR_with_labels = np.column_stack(
        (np.array(lst_imgs_no_DR), np.zeros((len(lst_imgs_no_DR),), dtype=int)))
    lst_imgs_DR_with_labels = np.column_stack(
        (np.array(lst_imgs_DR), np.ones((len(lst_imgs_DR),), dtype=int)))

    print("No-DR images Augmented: ", len(lst_imgs_no_DR_with_labels))
    print("DR images Augmented: ", len(lst_imgs_DR_with_labels))

    image_data_all = np.concatenate(
        (lst_imgs_no_DR_with_labels, lst_imgs_DR_with_labels), axis=0)
    df = pd.DataFrame(image_data_all, columns=['image', 'level'])
    df.to_csv(r'./Data/trainLabels_master_v4_final.csv')
    print("Completed")
    print("--- %s seconds ---" % (time.time() - start_time))
