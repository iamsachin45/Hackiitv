import os
from flask import Flask,request
from flask.templating import render_template
from flask import *
from werkzeug.utils import secure_filename
import sys
import time
from flask_socketio import SocketIO
from pdf2image import convert_from_path
app = Flask(__name__, template_folder='templates',static_url_path='/templates/style/home') 

socketio = SocketIO(app)

UPLOAD_FOLDER = 'C:\\xampp\\htdocs\\market_script\\pythoncheck\\pdfs'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# directory of static images 
outputDir = "static/"

@app.route("/")    
def hello_wor():
    return render_template('page.html')

@app.route("/student")    
def hello_world():
    return render_template('canva.html')


@app.route("/teacher")
def hello():
    return render_template('canva.html')



# @app.route("/",methods =["GET", "POST"])
# def home():
#   return render_template('home.html')
    
@app.route('/uploader', methods = ['POST'])
def upload_file():
    if request.method == 'POST':
      f = request.files['filename']
      
      if not os.path.exists(outputDir):
        os.makedirs(outputDir)
      f.save(os.path.join(app.config['UPLOAD_FOLDER'], f.filename))
      file = f"C:\\xampp\\htdocs\\market_script\\pythoncheck\\pdfs\\{f.filename}"
      pages = convert_from_path(file, 500,poppler_path=r'C:\\Users\\hp\\Downloads\\poppler-21.11.0\\Library\\bin')
      # print(len(pages))
      counter = 1
      for page in pages:
        myfile = outputDir +'output' + str(counter) +'.jpg'
        counter = counter + 1
        page.save(myfile, "JPEG")
      return 'Success file uploaded'




if __name__ == '__main__':
   app.run(debug = True)


















		    

# @app.route('/uploader', methods = ['GET', 'POST'])
# def upload_file():
#    if request.method == 'POST':
#       f = request.files['file']
#       f.save(secure_filename(f.filename))
#       return 'file uploaded successfully'    

# ---- - - - - - - - - ************** --------------------


# @app.route('/upload')
# def upload_file():
#    return render_template('upload.html')    

# from flask import Flask, render_template, request
# from werkzeug import secure_filename
# from app import app 
# app = Flask(__name__)

# @app.route('/upload')
# def upload_file():
#    return render_template('test.html')
	

