import React, { useState, useEffect } from "react";
import { Button, Form, message, Spin, Tabs } from "antd";
import Personalinfo from "../components/Personalinfo";
import SkillsEducation from "../components/SkillsEducation";
import ExperienceProjects from "../components/experienceProjects";
import Certificates from "../components/Certificates";
import Interests from "../components/Interests";
import axios from "../utils/axiosConfig";
import Header from "../components/Header";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get("/api/user/profile");
        setUserData(data);
        // Cache for templates
        localStorage.setItem("resume-user", JSON.stringify({
          ...data,
          firstname: data.firstName || "",
          lastname: data.lastName || "",
          mobileNumber: data.phone || "",
          address: data.location || "",
          objective: data.summary || "",
        }));
      } catch (err) {
        message.error("Unable to load profile data");
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    getProfileData();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const { data } = await axios.post("/api/user/update", values);

      if (data.success) {
        message.success("Profile updated successfully 🚀");
        // refresh and re-cache
        const { data: refreshed } = await axios.get("/api/user/profile");
        setUserData(refreshed);
        localStorage.setItem("resume-user", JSON.stringify({
          ...refreshed,
          firstname: refreshed.firstName || "",
          lastname: refreshed.lastName || "",
          mobileNumber: refreshed.phone || "",
          address: refreshed.location || "",
          objective: refreshed.summary || "",
        }));
      } else {
        message.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update profile";
      message.error(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row home">
      <Header />

      <div className="row profile">
        {(loading || fetching) && <Spin size="large" />}

        <div className="update-profile">
          <h2>
            <b>ResuMatch Profile</b>
          </h2>
          <p style={{ color: "#94a3b8" }}>
            Update your details to generate better resume insights.
          </p>

          <hr />

          {userData ? (
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={userData}
            >
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: "Personal Info",
                    key: "1",
                    children: <Personalinfo />,
                  },
                  {
                    label: "Skills & Education",
                    key: "2",
                    children: <SkillsEducation />,
                  },
                  {
                    label: "Experience & Projects",
                    key: "3",
                    children: <ExperienceProjects />,
                  },
                  {
                    label: "Certificates",
                    key: "4",
                    children: <Certificates />,
                  },
                  {
                    label: "Interests",
                    key: "5",
                    children: <Interests />,
                  },
                ]}
              />

              <Button
                htmlType="submit"
                type="primary"
                size="large"
                style={{
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
              >
                Save Profile
              </Button>
            </Form>
          ) : (
            <Spin size="large" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
