import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

/* LINK INPUT COMPONENT */
const InputWithLink = ({ value, onChange, placeholder }) => {
  const handleChange = (e) => {
    let input = e.target.value.trim();

    if (input && !input.startsWith("http")) {
      input = "https://" + input;
    }

    onChange(input);
  };

  return (
    <Input value={value} onChange={handleChange} placeholder={placeholder} />
  );
};

function Certificates() {
  return (
    <div>
      {/* CERTIFICATIONS */}
      <h5>
        <b>Certifications</b>
      </h5>
      <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
        Add your certificates with credential links
      </p>
      <hr />

      <Form.List name="certificates">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <React.Fragment key={key}>
                  <div className="col-md-5">
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label="Certificate Title"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="e.g. AWS Certified Developer" />
                    </Form.Item>
                  </div>

                  <div className="col-md-5">
                    <Form.Item
                      {...restField}
                      name={[name, "credential"]}
                      label="Credential Link"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <InputWithLink placeholder="Paste certificate link" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2 d-flex align-items-center">
                    <MinusCircleOutlined
                      style={{ fontSize: 20, color: "#ff4d4f" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Certificate
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* COURSES */}
      <h5 style={{ marginTop: "30px" }}>
        <b>Courses</b>
      </h5>
      <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
        Add relevant courses or training programs
      </p>
      <hr />

      <Form.List name="courses">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <React.Fragment key={key}>
                  <div className="col-md-5">
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label="Course Name"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="e.g. Data Structures in C++" />
                    </Form.Item>
                  </div>

                  <div className="col-md-5">
                    <Form.Item
                      {...restField}
                      name={[name, "organization"]}
                      label="Platform / Organization"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="e.g. Coursera / Udemy" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2 d-flex align-items-center">
                    <MinusCircleOutlined
                      style={{ fontSize: 20, color: "#ff4d4f" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Course
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default Certificates;
