export const students = [
  { name: "Karan", phone: "1234", email: "krn@zxc.com", password: "1234" },
  { name: "Varun", phone: "125432", email: "vrn@zxc.com", password: "1234" },
  { name: "Kanni", phone: "352132", email: "kanni@zxc.com", password: "1234" },
  { name: "Gyan", phone: "94582", email: "gyn@zxc.com", password: "1234" }
];

// Initialize meal status for each student
export const initializeMealStatus = () => {
  const mealStatus = {};
  students.forEach(student => {
    mealStatus[student.email] = {
      breakfast: false,
      lunch: false,
      snacks: false,
      dinner: false
    };
  });
  return mealStatus;
}; 