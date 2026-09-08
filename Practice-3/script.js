// DAY 1 — JavaScript Fundamentals
        const student = {
            name: "Sakib Hasan",
            age: 21,
            course: "BCA",
            marks: [85, 78, 92, 88, 76]
        };

        const calculatePercentage = (marks) => {
            const total = marks.reduce((sum, mark) => sum + mark, 0);
            return (total / (marks.length * 100)) * 100;
        };

        const getGrade = (percentage) => {
            if (percentage >= 90) return "A+";
            if (percentage >= 80) return "A";
            if (percentage >= 70) return "B";
            if (percentage >= 60) return "C";
            if (percentage >= 50) return "D";
            return "F";
        };

        const percentage = calculatePercentage(student.marks);
        const grade = getGrade(percentage);

        // HTML elements me values insert karna
        document.getElementById("name").innerText = student.name;
        document.getElementById("age").innerText = student.age;
        document.getElementById("course").innerText = student.course;
        document.getElementById("percentage").innerText = percentage.toFixed(2) + "%";
        document.getElementById("grade").innerText = grade;