import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const { TextArea } = Input;

function ExperienceProjects() {
  return (
    <div>
      {/* ===== EXPERIENCE SECTION ===== */}
      <h5>
        <b>Professional Experience</b>
      </h5>
      <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
        Add your internships, jobs, or work experience
      </p>
      <hr />

      <Form.List name="experience">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                className="mb-4 p-3"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                }}
              >
                <div className="row">
                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "designation"]}
                      label="Role / Position"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="e.g. Frontend Developer Intern" />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "company"]}
                      label="Organization"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="e.g. Infosys" />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "place"]}
                      label="Location"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="City / Remote" />
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <Form.Item
                      {...restField}
                      name={[name, "range"]}
                      label="Duration"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="e.g. MM/YYYY - MM/YYYY or Present" />
                    </Form.Item>
                  </div>

                  <div className="col-md-6">
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label="Key Contributions"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <TextArea
                        rows={3}
                        placeholder="Explain what you did, impact, tools used..."
                      />
                    </Form.Item>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <MinusCircleOutlined
                    style={{ fontSize: 20, color: "#ff4d4f" }}
                    onClick={() => remove(name)}
                  />
                </div>
              </div>
            ))}

            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Experience
            </Button>
          </>
        )}
      </Form.List>

      {/* ===== PROJECT SECTION ===== */}
      <h5 style={{ marginTop: "40px" }}>
        <b>Projects</b>
      </h5>
      <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
        Showcase your best work and technical skills
      </p>
      <hr />

      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                className="mb-4 p-3"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                }}
              >
                <div className="row">
                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      label="Project Title"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="e.g. ResuMatch ATS Analyzer" />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "techstack"]}
                      label="Tech Stack"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="React, Node.js, MongoDB..." />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "link"]}
                      label="Project Link"
                    >
                      <Input placeholder="GitHub / Live URL" />
                    </Form.Item>
                  </div>

                  <div className="col-md-12">
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label="Project Description"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <TextArea
                        rows={3}
                        placeholder="Explain features, impact, and your role..."
                      />
                    </Form.Item>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <MinusCircleOutlined
                    style={{ fontSize: 20, color: "#ff4d4f" }}
                    onClick={() => remove(name)}
                  />
                </div>
              </div>
            ))}

            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Project
            </Button>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default ExperienceProjects;
