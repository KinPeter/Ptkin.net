# -*- coding: utf-8 -*-
import openpyxl
from datetime import datetime

def load_dict_column(column):
    """ loads the given column of the excel sheet to a list """
    mylist = []
    for col in sheet[column]:
        mylist.append(col.value)
    return mylist

def writer(kor, hun, filepath):
    encoding = "utf-8"
    check_kor = 0
    check_hun = 0
    with open(filepath, 'w', encoding=encoding) as file:
        text = "var kor = [ "
        for elem in kor:
            if elem != "" and elem != None:
                text += "\"" + str(elem) + "\" , "
                check_kor += 1
        text = text[:-2]
        text += "];\n\nvar hun = [ "
        for elem in hun:
            if elem != "" and elem != None:
                text += "\"" + str(elem) + "\" , "
                check_hun += 1
        text = text[:-2]
        text += "];"

        if check_hun == check_kor :
            print("Export successful, " + str(check_hun) + " entries were added.")
            text += "\n\n// Export successful, " + str(check_hun) + " entries have been added. \n// Current time: " + str(now)
            file.write(text)

        else :
            print("Different size of arrays! kor: " + str(check_kor) + " hun: " + str(check_hun))
            with open("error.txt", 'w') as error_file:
                error_text = "Sorry, something is wrong with the database. \nDifferent size of arrays! kor: " + str(check_kor) + " hun: " + str(check_hun) + "\nCurrent time: " + str(now)
                error_file.write(error_text)

""" loading the dictionary file """
filename = "rawdict.xlsx"
book = openpyxl.load_workbook(filename=filename)
sheet = book['Sheet1']
kor = load_dict_column('A')
hun = load_dict_column('B')

now = datetime.now().strftime('%Y.%m.%d %H:%M')

writer(kor, hun, "dict.js")
