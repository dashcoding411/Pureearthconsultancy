from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)

# Configure database (SQLite for simplicity)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database model for contact form submissions
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    date_submitted = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Contact {self.name}>'

# Routes
@app.route('/')
def home():
    return render_template('index.html', title='Home')

@app.route('/services')
def services():
    return render_template('services.html', title='Services')

@app.route('/about')
def about():
    return render_template('about.html', title='About')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        data = request.form
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Save to database
        new_contact = Contact(name=name, email=email, message=message)
        db.session.add(new_contact)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Thank you for contacting us!'})
    return render_template('contact.html', title='Contact')

# API endpoint for frontend consumption
@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    results = [
        {'id': c.id, 'name': c.name, 'email': c.email, 'message': c.message, 'date_submitted': c.date_submitted} 
        for c in contacts
    ]
    return jsonify(results)

if __name__ == '__main__':
    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()
    app.run(debug=True)
