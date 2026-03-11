-- Create database
CREATE DATABASE kisan_sathi;

-- Connect to the database (run commands after this in kisan_sathi database)
-- \c kisan_sathi in psql

-- Create farmers table
CREATE TABLE farmers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    aadhar_number VARCHAR(12),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    land_size_hectares DECIMAL(10, 2),
    crop_types VARCHAR(255),
    farmer_category VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create schemes table
CREATE TABLE schemes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ministry VARCHAR(255),
    eligibility_criteria TEXT,
    min_land_size DECIMAL(10, 2),
    max_land_size DECIMAL(10, 2),
    subsidy_percentage DECIMAL(5, 2),
    subsidy_amount DECIMAL(15, 2),
    documents_required VARCHAR(500),
    application_deadline DATE,
    contact_info VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create applications table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL,
    scheme_id INTEGER NOT NULL,
    application_number VARCHAR(50) UNIQUE,
    status VARCHAR(50) DEFAULT 'PENDING',
    submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_date TIMESTAMP,
    rejected_date TIMESTAMP,
    approval_notes TEXT,
    rejection_reason TEXT,
    approved_subsidy_amount DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id),
    FOREIGN KEY (scheme_id) REFERENCES schemes(id)
);

-- Create documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL,
    application_id INTEGER,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size_bytes INTEGER,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_notes TEXT,
    rejection_reason TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id),
    FOREIGN KEY (application_id) REFERENCES applications(id)
);

-- Create users table (admin/staff)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create application_status_history table
CREATE TABLE application_status_history (
    id SERIAL PRIMARY KEY,
    application_id INTEGER NOT NULL,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by INTEGER,
    change_reason TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id),
    FOREIGN KEY (changed_by) REFERENCES users(id)
);

-- Create notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL,
    application_id INTEGER,
    notification_type VARCHAR(50),
    title VARCHAR(255),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES farmers(id),
    FOREIGN KEY (application_id) REFERENCES applications(id)
);

-- Create indexes for better performance
CREATE INDEX idx_farmers_email ON farmers(email);
CREATE INDEX idx_farmers_state ON farmers(state);
CREATE INDEX idx_farmers_district ON farmers(district);
CREATE INDEX idx_applications_farmer_id ON applications(farmer_id);
CREATE INDEX idx_applications_scheme_id ON applications(scheme_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_documents_farmer_id ON documents(farmer_id);
CREATE INDEX idx_documents_application_id ON documents(application_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_notifications_farmer_id ON notifications(farmer_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_application_status_history_application_id ON application_status_history(application_id);
