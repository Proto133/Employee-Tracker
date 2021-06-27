const router = require('express').Router();
const Employee = require('../../models/Employee');

// TODO: Use try/catch to catch errors
// TODO: Return the appropriate HTTP status codes

// GET a employee
router.get('/:id', async(req, res) => {
    const employeeData = await employee.findByPk(req.params.id).catch((err) =>
        res.json(err)
    );
    if (!employeeData) {
        res.status(200).json({ message: "Ain't nobody by that id  . . . you dunce." })

    } else {
        res.status(200).json(employeeData);
    };
});

router.post('/', async(req, res) => {
    try {
        const employeeData = await employee.create(req.body);
        // 200 status code means the request is successful
        res.status(200).json(employeeData);
    } catch (err) {
        // 500 Internal Server Error
        res.status(500).json(err);
    }
});

// UPDATE a employee
router.put('/:id', async(req, res) => {
    const employeeData = await employee.update(req.body, {
        where: {
            id: req.params.id,
        },
    }).catch((err) => res.json(err));
    res.json(employeeData);
});

// DELETE a employee
router.delete('/:id', async(req, res) => {
    const employeeData = await employee.destroy({
        where: {
            id: req.params.id,
        },
    }).catch((err) => res.json(err));
    res.json(employeeData);
});

module.exports = router;