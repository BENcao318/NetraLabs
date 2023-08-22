const db = require('../models')
const project = require('../models/project')
const { User, Hackathon, Project, UserProject } = db
const Op = db.Sequelize.Op

exports.createProject = async (req, res) => {
  const { projectData, hackathonId, userEmail } = req.body

  console.log(projectData, hackathonId, userEmail)

  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  const transaction = await db.sequelize.transaction()

  try {
    const user = await User.findOne(
      {
        where: {
          email: userEmail,
        },
      },
      { transaction }
    )
    const hackathon = await Hackathon.findByPk(hackathonId, { transaction })

    if (user && hackathon) {
      const project = await Project.create(
        {
          name: projectData.name,
          tagline: projectData.tagline,
          tech_stack: projectData.techStack,
          repository_url: projectData.repositoryUrl,
          video_url: projectData.videoUrl,
          hackathon_id: hackathonId,
        },
        { transaction }
      )
      await UserProject.create(
        {
          project_id: project.id,
          user_id: user.id,
        },
        { transaction }
      )
    }

    await transaction.commit()
    res.status(200).send({
      success: true,
      message: 'Project create success',
      messge2: null,
    })
  } catch (err) {
    console.log('err message:', err.message)
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User',
    })
  }
}

exports.getProjectsByUserEmail = async (req, res) => {
  const { userEmail } = req.body

  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  try {
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
      include: [{ model: Project, include: Hackathon, through: UserProject }],
    })

    const projectList = user.Projects.map((project) => {
      const hackathon = project.Hackathon
      return {
        project: project,
        hackathon: hackathon,
      }
    })

    res.status(200).send({
      success: true,
      message: 'Project create success',
      message2: projectList,
    })
  } catch (err) {
    console.log('err message:', err.message)
    res.status(500).send({
      message: err.message || 'Some error occurred while getting the Projects',
    })
  }
}

exports.getProjectById = async (req, res) => {
  const { projectId, userEmail } = req.body

  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  console.log(projectId)
  try {
    if (userEmail !== req.session.user.email) {
      res.status(400).send({
        message:
          'Some error occurred while matching the session with user email',
      })
      return null
    }

    const project = await Project.findOne({
      where: {
        id: projectId,
      },
      attributes: [
        'id',
        'hackathon_id',
        'name',
        'pitch',
        'story',
        'team_id',
        'tech_stack',
      ],
    })

    console.log(project)

    res.status(200).send({
      success: true,
      message: 'Project get success',
      message2: project,
    })
  } catch (err) {
    console.log('err message:', err.message)
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User',
    })
  }
}
