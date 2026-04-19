import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

function PersonalInfo() {
  return (
    <div className="personal-container">
      <h5>
        <b>Basic Information</b>
      </h5>
      <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
        Update your core personal details
      </p>
      <hr />
      <div className="mb-4 p-3" style={{ border: "1px solid #e5e7eb", borderRadius: "10px" }}>
        <div className="form-grid">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Enter first name" }]}
          >
            <Input placeholder="e.g. Nidhi" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Enter last name" }]}
          >
            <Input placeholder="e.g. Gupta" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                pattern: /^[0-9]{10}$/,
                message: "Enter valid 10-digit number",
              },
            ]}
          >
            <Input placeholder="9876543210" />
          </Form.Item>

          <Form.Item
            name="portfolio"
            label="Portfolio / LinkedIn"
            rules={[
              {
                type: "url",
                message: "Enter valid URL (e.g. https://...)",
                warningOnly: true,
              },
            ]}
          >
            <Input placeholder="https://linkedin.com/in/..." />
          </Form.Item>
        </div>
      </div>

      <h5 style={{ marginTop: "40px" }}>
        <b>Additional Details</b>
      </h5>
      <hr />
      <div className="mb-4 p-3" style={{ border: "1px solid #e5e7eb", borderRadius: "10px" }}>
        <Form.Item
          name="summary"
          label="Professional Summary"
        >
          <TextArea
            rows={3}
            placeholder="Briefly describe your skills and goals..."
          />
        </Form.Item>

        <Form.Item
          name="location"
          label="Address / Location"
        >
          <TextArea rows={2} placeholder="City, State, Country" />
        </Form.Item>
      </div>
    </div>
  );
}

export default PersonalInfo;

