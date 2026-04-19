const request = require("request");
const cheerio = require("cheerio");
const _ = require("underscore");

/* ================== TITLES ================== */
const titles = {
  objective: ["Objective", "objectives"],
  summary: ["Summary"],
  technology: ["Technology", "Technologies"],
  experience: ["Experience", "Work Experience"],
  education: ["Education"],
  skills: [
    "Skills",
    "Skills & Expertise",
    "Tools",
    "Expertise",
    "Tools & Technologies",
    "Areas of Expertise",
  ],
  languages: ["Languages"],
  courses: ["Courses"],
  projects: ["Projects"],
  links: ["Links"],
  contacts: ["Contacts"],
  positions: ["Positions", "Position"],
  profiles: [
    "Profiles",
    "Social connect",
    "Social profiles",
  ],
  awards: ["Awards"],
  honors: ["Honors"],
  additional: ["Additional"],
  certification: ["Certification", "Certifications"],
  interests: ["Interests"],
};

/* ================== PROFILE SCRAPERS ================== */

const profiles = [
  [
    "github.com",
    (url, Resume, watcher) => {
      download(url, (data, err) => {
        if (!data) {
          console.error("GitHub fetch error:", err);
          watcher.inProgress--;
          return;
        }

        const $ = cheerio.load(data);

        Resume.addObject("github", {
          name: $(".vcard-fullname").text(),
          location: $(".octicon-location").parent().text(),
          email: $(".octicon-mail").parent().text(),
          link: $(".octicon-link").parent().text(),
          joined: $(".octicon-clock").parent().text(),
          company: $(".octicon-organization").parent().text(),
        });

        watcher.inProgress--;
      });
    },
  ],

  [
    "linkedin.com",
    (url, Resume, watcher) => {
      download(url, (data, err) => {
        if (!data) {
          console.error("LinkedIn fetch error:", err);
          watcher.inProgress--;
          return;
        }

        const $ = cheerio.load(data);

        const linkedData = {
          summary: $("#summary-item .summary").text(),
          name: $(".full-name").text(),
          positions: { past: [], current: {} },
          languages: [],
          skills: [],
          educations: [],
        };

        $(".past-position").each((_, el) => {
          const $el = $(el);
          linkedData.positions.past.push({
            title: $el.find("header > h4").text(),
            company: $el.find("header > h5").text(),
          });
        });

        $(".skills-section .skill-pill .endorse-item-name-text").each((_, el) => {
          linkedData.skills.push($(el).text());
        });

        Resume.addObject("linkedin", linkedData);

        watcher.inProgress--;
      });
    },
  ],

  "facebook.com",
  "bitbucket.org",
  "stackoverflow.com",
];

/* ================== INLINE + REGEX ================== */

const inline = {
  skype: "skype",
};

const regular = {
  name: [/([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/],
  email: [/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  phone: [
    /((?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{4})/i,
  ],
};

/* ================== EXPORT ================== */

module.exports = {
  titles,
  profiles,
  inline,
  regular,
};

/* ================== HELPER ================== */

function download(url, callback) {
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(body);
    } else {
      callback(null, error);
    }
  });
}