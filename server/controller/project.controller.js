const db = require('../models')
const { User, Hackathon, Project, UserProject, Team, UserTeam, Invitation } = db
const Op = db.Sequelize.Op
const { sendEmail } = require('../helpers/utils')
const TEAMSIZE = 5

exports.createProject = async (req, res) => {
  const { projectData, hackathonId, userEmail } = req.body

  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  try {
    const projectValue = await Project.findOne({
      where: {
        name: projectData.name,
        hackathon_id: hackathonId,
      },
    })

    if (projectValue !== null) {
      res.status(400).send({
        success: false,
        message: 'Project name exists, please create a new project name',
        messge2: null,
      })
      return null
    }
    const transaction = await db.sequelize.transaction()

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
          pitch: projectData.pitch,
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

exports.getProjectsByUserId = async (req, res) => {
  const { userId } = req.body

  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Project,
          include: [{ model: Hackathon }],
          through: UserProject,
        },
        {
          model: Project,
          include: [{ model: Team }],
          through: UserTeam,
        },
      ],
    })

    const projectList = user.Projects.map((project) => {
      const hackathon = project.Hackathon
      return {
        project: project,
        hackathon: hackathon,
        team: {
          name: project.Team?.name,
          hasTeam: project.Team?.name ? true : false,
          isTeamLeader: project.Team?.team_leader_id === userId,
        },
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

exports.getProjectByProjectId = async (req, res) => {
  const { projectId, userId } = req.body

  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  try {
    if (userId !== req.session.user.id) {
      res.status(400).send({
        message:
          'Some error occurred while matching the session with user email',
      })
      return null
    }

    let project = await Project.findOne({
      where: {
        id: projectId,
      },
      attributes: [
        'id',
        'hackathon_id',
        'name',
        'pitch',
        'story',
        'tech_stack',
        'video_url',
        'repository_url',
      ],
    })

    let team = await Team.findOne({
      where: {
        project_id: projectId,
      },
    })

    if (team !== null) {
      // const users = await User.findAll({
      //   include: [
      //     {
      //       model: UserTeam,
      //       where: {
      //         team_id: team.id,
      //       },
      //     },
      //   ],
      //   attributes: ['id', 'firstName', 'lastName', 'role', 'skills', 'avatar'],
      //   where: {
      //     id: {
      //       [Op.ne]: userId,
      //     },
      //   },
      // })

      const usersInTeam = await UserTeam.findAll({
        where: {
          team_id: team.id,
        },
        attributes: ['user_id'],
      })
      const userIDsInTeam = usersInTeam.map((userTeam) => userTeam.user_id)

      const usersData = await User.findAll({
        where: {
          id: {
            [Op.in]: userIDsInTeam,
            [Op.ne]: userId,
          },
        },
        attributes: ['id', 'firstName', 'lastName', 'role', 'skills', 'avatar'],
      })

      project = {
        ...project.dataValues,
        team: {
          name: team.name,
          members: usersData,
        },
      }

      // console.log('userInTeam++++++++++++++++++++++', usersInTeam)
    }

    // project =
    //   team === null
    //     ? { ...project.dataValues, hasTeam: false }
    //     : { ...project.dataValues, hasTeam: true }

    console.log('project+++++++++++++++++++', project)

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

exports.updateProjectById = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const { projectId, projectData, userEmail, hackathonId } = req.body

  try {
    if (userEmail !== req.session.user.email) {
      res.status(400).send({
        message:
          'Some error occurred while matching the session with user email',
      })
      return null
    }

    const projectValue = await Project.findOne({
      where: {
        name: projectData.name,
        hackathon_id: hackathonId,
        id: {
          [Op.ne]: projectId,
        },
      },
    })

    if (projectValue !== null) {
      res.status(400).send({
        success: false,
        message: 'Project name exists, please create a new project name',
        messge2: null,
      })
      return null
    }

    const project = await Project.update(
      {
        name: projectData.name,
        pitch: projectData.pitch,
        story: projectData.story,
        tagline: projectData.tagline,
        tech_stack: projectData.techStack,
        video_url: projectData.videoUrl,
        repository_url: projectData.repositoryUrl,
      },
      {
        where: {
          id: projectId,
        },
      }
    )

    res.status(200).send({
      success: true,
      message: 'Project update success',
    })
  } catch (err) {
    console.log('err message:', err.message)
    res.status(500).send({
      message: err.message || 'Some error occurred while updating the project',
    })
  }
}

exports.createNewTeam = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const { name, projectId, userEmail } = req.body

  try {
    if (userEmail !== req.session.user.email) {
      res.status(400).send({
        message:
          'Some error occurred while matching the session with user email',
      })
      return null
    }

    const team = await Team.findOne({
      where: {
        name: name,
      },
    })

    if (team !== null) {
      res.status(400).send({
        message: 'Team name already exists, please create a different name',
      })
      return null
    }
    const transaction = await db.sequelize.transaction()
    const user = await User.findOne(
      {
        where: {
          email: userEmail,
        },
      },
      { transaction }
    )

    let project = await Project.findByPk(projectId, { transaction })

    if (user && project) {
      const team = await Team.create(
        {
          name: name,
          team_leader_id: user.id,
          project_id: projectId,
        },
        {
          transaction,
        }
      )
      await UserTeam.create(
        {
          user_id: user.id,
          team_id: team.id,
        },
        { transaction }
      )
    }

    await transaction.commit()

    project = { ...project.dataValues, hasTeam: true }
    res.status(200).send({
      success: true,
      message: 'Team create success',
      message2: project,
    })
  } catch (err) {
    console.log('err message:', err.message)
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the team',
    })
  }
}

exports.inviteNewMember = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  try {
    res.status(200).send({
      success: true,
      message: 'Team create success',
    })
  } catch (err) {
    console.log('err message:', err.message)
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the team',
    })
  }
}

exports.inviteParticipant = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const { projectId, participantId, userId } = req.body

  try {
    const oldInvitation = await Invitation.findOne({
      where: {
        project_id: projectId,
        invitee_id: participantId,
      },
    })

    if (oldInvitation !== null) {
      res.status(200).send({
        success: false,
        message: 'You have alreay invited this person to the project.',
      })
      return
    }

    const team = await Team.findOne({
      where: {
        project_id: projectId,
      },
    })

    const users = await UserTeam.findAll({
      where: {
        team_id: team.id,
      },
    })

    if (users.length >= TEAMSIZE) {
      res.status(200).send({
        success: false,
        message: `You have reached team size of ${TEAMSIZE}`,
      })
      return
    }

    await Invitation.create({
      project_id: projectId,
      inviter_id: userId,
      invitee_id: participantId,
      viewed_by_invitee: false,
      accepted_offer: false,
    })

    res.status(200).send({
      success: true,
      message: 'Invitation successfully created',
    })
  } catch (err) {
    console.log('err message:', err.message)
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the invitation',
    })
  }
}

exports.getProjectsWithTeamByUserId = async (req, res) => {
  const { userId } = req.body

  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Project,
          include: [{ model: Hackathon }],
          through: UserProject,
        },
        {
          model: Project,
          include: [{ model: Team }],
          through: UserTeam,
        },
      ],
    })

    const projectList = user.Projects.map((project) => {
      const hackathon = project.Hackathon
      if (project.Team !== null) {
        return {
          project: project,
          hackathon: hackathon,
          team: {
            name: project.Team?.name,
          },
        }
      }
    })

    const filteredProjectList = projectList.filter(
      (project) => project !== undefined
    )

    res.status(200).send({
      success: true,
      message: 'Project create success',
      message2: filteredProjectList,
    })
  } catch (err) {
    console.log('err message:', err.message)
    res.status(500).send({
      message: err.message || 'Some error occurred while getting the Projects',
    })
  }
}
