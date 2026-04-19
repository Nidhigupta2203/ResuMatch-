import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, AutoComplete } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";


function SkillsEducation() {
  const [collegeList, setCollegeList] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [value, setValue] = useState("");

  const degreeOptions = [
    { label: "B.Tech", value: "B.Tech" },
    { label: "B.Sc", value: "B.Sc" },
    { label: "B.A", value: "B.A" },
    { label: "B.Com", value: "B.Com" },
    { label: "M.Tech", value: "M.Tech" },
    { label: "M.Sc", value: "M.Sc" },
    { label: "MBA", value: "MBA" },
    { label: "Diploma", value: "Diploma" },
  ];

  const user = JSON.parse(localStorage.getItem("resume-user")) || {};
  // fetch colleges
  useEffect(() => {
    fetch(`http://localhost:5000/api/colleges?query=${value}`)
      .then((res) => res.json())
      .then((data) => {
        setCollegeList(data);
        setSearchOptions(data);
      })
      .catch(() => console.log("Failed to load colleges"));
  }, [user.name]);

  const handleSearch = (value) => {
    const filtered = collegeList.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setSearchOptions(filtered);
  };

  return (
    <div className="edu-skill-container">
      {/* ===== EDUCATION ===== */}
      <h5>
        <b>Education Details</b>
      </h5>
      <p style={{ color: "#94a3b8", marginBottom: "10px" }}>
        Add your academic background
      </p>
      <hr />
      <div className="mb-4 p-3" style={{ border: "1px solid #e5e7eb", borderRadius: "10px" }}>
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div className="edu-box" key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, "qualification"]}
                    rules={[{ required: true, message: "Select degree" }]}
                  >
                    <Select 
                      options={degreeOptions} 
                      placeholder="Degree" 
                      style={{ width: "100%" }}
                      listHeight={150}
                      placement="bottomLeft"
                      getPopupContainer={() => document.body}
                      dropdownStyle={{ zIndex: 9999 }}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "course"]}
                    rules={[{ required: true, message: "Enter branch" }]}
                  >
                    <Input placeholder="Branch / Course" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "percentage"]}
                    rules={[
                      { required: true, message: "Enter score" },
                      {
                        validator: (_, value) => {
                          const num = parseFloat(value);
                          if (isNaN(num))
                            return Promise.reject("Invalid number");
                          if (num < 0 || num > 100)
                            return Promise.reject("Enter 0–100 or GPA");
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="GPA / %" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "institution"]}
                    rules={[{ required: true, message: "Enter college" }]}
                  >
                    <AutoComplete
                      options={searchOptions.map((c) => ({
                        value: c.name,
                      }))}
                      onSearch={handleSearch}
                      placeholder="College name"
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "range"]}
                    rules={[{ required: true, message: "Enter duration" }]}
                  >
                    <Input placeholder="e.g. 2021 - 2025" />
                  </Form.Item>

                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                type="primary"
                ghost
                icon={<PlusOutlined />}
                onClick={() => add()}
                className="add-btn"
              >
                Add Education
              </Button>
            </>
          )}
        </Form.List>
      </div>

      {/* ===== SKILLS ===== */}
      <h5 style={{ marginTop: "40px" }}>
        <b>Skills & Proficiency</b>
      </h5>
      <hr />
      <div className="mb-4 p-3" style={{ border: "1px solid #e5e7eb", borderRadius: "10px" }}>
        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div className="skill-box" key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, "technology"]}
                    rules={[{ required: true, message: "Enter skill" }]}
                  >
                    <Input placeholder="e.g. React, Java, Python" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    rules={[
                      { required: true, message: "Enter level" },
                      {
                        validator: (_, value) => {
                          const num = Number(value);
                          if (num < 1 || num > 10)
                            return Promise.reject("Range 1-10");
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Skill level (1-10)" />
                  </Form.Item>

                  <DeleteOutlined
                    className="delete-icon"
                    onClick={() => remove(name)}
                  />
                </div>
              ))}

              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                block
              >
                Add Skill
              </Button>
            </>
          )}
        </Form.List>
      </div>
    </div>
  );
}

export default SkillsEducation;
