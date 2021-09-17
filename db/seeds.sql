INSERT INTO department (department_name)
VALUES	('Executive Staff'),
        ('Human resources'),
		('Business Development'),
        ('Marketing'),
        ('Sales');
        
INSERT INTO role (title, department_id) 
VALUES	('Chief Executive Officer', 1),
        ('Head of HR', 2),
		('Top Idea Thinker-Upper', 3),
        ('Marketing Manager', 4),
        ('Marketing Coordinator', 4),
        ('Sales Team Manager', 5),
        ('Sales Associate', 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Stan', 'Smith', 1),
        ('Sally', 'Jenkins', 2, 1),
        ('John', 'Rodgers', 3, 1),
        ('Louisa', 'Daniels', 4, 1),
        ('Angela', 'Doe', 5, 4),
        ('Jane', 'Stephens', 6, 1 ),
        ('Joey', 'Bower', 7, 6);