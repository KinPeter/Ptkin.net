# -*- coding: utf-8 -*-
import openpyxl
from datetime import datetime

def load_dict_column(column):
    """ loads the given column of the excel sheet to a list """
    mylist = []
    for col in sheet[column]:
        mylist.append(col.value)
    return mylist

def writer(topPicksName, topPicksLink, coursesName, coursesLink, docsName, docsLink, resourcesName, resourcesLink, frameWorksName, frameWorksLink, linuxName, linuxLink, filepath):
    encoding = "utf-8"
    lists = [topPicksName, topPicksLink, coursesName, coursesLink, docsName, docsLink, resourcesName, resourcesLink, frameWorksName, frameWorksLink, linuxName, linuxLink]
    varNames = ["topPicks", "1", "courses", "2", "docs", "3", "resources", "4", "frameWorks", "5", "linux", "6"]
    text = ""

    with open(filepath, 'w', encoding=encoding) as file:
        i = 0
        while i < len(varNames) :
            text += "var " + str(varNames[i]) + " = [ \n"
            for name, link in zip(lists[i], lists[i+1]):
                if name != "" and name != None:
                    text += "    [\"" + str(name) + "\", \"" + str(link) + "\"],\n"
            text = text[:-2]
            text += "\n];\n"
            i += 2

        print("Export successful.")
        text += "\n\n// Export successful. \n// Current time: " + str(now)
        file.write(text)



""" loading the dictionary file """
filename = "links.xlsx"
book = openpyxl.load_workbook(filename=filename)
sheet = book['Sheet1']
topPicksName = load_dict_column('A')
topPicksLink = load_dict_column('B')
coursesName = load_dict_column('C')
coursesLink = load_dict_column('D')
docsName = load_dict_column('E')
docsLink = load_dict_column('F')
resourcesName = load_dict_column('G')
resourcesLink = load_dict_column('H')
frameWorksName = load_dict_column('I')
frameWorksLink = load_dict_column('J')
linuxName = load_dict_column('K')
linuxLink = load_dict_column('L')

now = datetime.now().strftime('%Y.%m.%d %H:%M')

writer(topPicksName, topPicksLink, coursesName, coursesLink, docsName, docsLink, resourcesName, resourcesLink, frameWorksName, frameWorksLink, linuxName, linuxLink, "links.js")


"""
a = ['a', 'b', 'c']
b = [1, 2, 3]

for i, j in zip(a, b):
	print('%s is %s' % (i, j))
"""
