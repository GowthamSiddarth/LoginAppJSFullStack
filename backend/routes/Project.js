const express = require('express');
const passport = require('passport');
const validateProjectDetails = require('../validation/projectDetails');

const Project = require('../models/Project');
const router = express.Router();

router.post('/createNewProject', passport.authenticate('jwt', { session: false }), function (req, res) {
    const { errors, isValid } = validateProjectDetails(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }

    Project.findOne({
        location: req.body.projectLocation
    }).then(project => {
        if (project) {
            errors.projectLocation = 'Job for Project Location already created!';
            return res.status(400).json(errors);
        } else {
            Project.findOne({
                name: req.body.projectName
            }).then(project => {
                if (project) {
                    errors.projectName = 'Job for Project Name already created!';
                    return res.status(400).json(errors);
                } else {
                    const newProject = new Project({
                        location: req.body.projectLocation,
                        name: req.body.projectName,
                        type: req.body.projectType,
                    });

                    newProject.save()
                        .then(project => {
                            res.json({
                                success: true,
                                message: {
                                    exists: false
                                }
                            });
                        })
                        .catch(err => console.log(err));
                }
            }).catch(err => console.error(err));
        }
    }).catch(err => console.log(err));
});

module.exports = router;