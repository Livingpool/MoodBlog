const express = require('express')
const Session = require('./demo_model')
const DiarySession = require('./diary_model')
const OpenAIChat = require('./utils/openai')
const DiaryOpenAIChat = require('./utils/diary_openai')

const router = express.Router()

// ------------DEMO------------------

router.get("/test", (req, res) => {
  res.send({ msg: "you are amazing!" });
})

// Create session.
router.post('/users/:userId/sessions', (req, res) => {
	// 從 request 中獲取 'userId' 參數
	const userId = req.params.userId;

	// 檢查 'postId' 參數是否存在
	if (!userId) {
		res.status(400).send({
			message: 'User ID is required',
		});
		return;
	}

  try {
    const newSession = new Session({
      user: userId,
      title: ""
    });
    console.log(newSession);

    newSession.save().then(data => {
      const savedDocument = {
        _id: data._id,
        user: data.user,
        title: data.title,
        createdAt: data.createdAt,
        messages: data.messages
      };
      res.send(savedDocument);
    })
  } catch (error){
    console.error(error);
    res.status(500).send({
      message: 'Internal Server Error'
    });
  }
  
})

// Use userId to search for all corresponding sessions.
router.get('/users/:userId/sessions', (req, res) => {
  const userId = req.params.userId;

	if (!userId) {
		res.status(400).send({
			message: 'User ID is required',
		});
		return;
	}

  (async () => {
    try {
      const ses = await Session.find({ user: userId }).select('_id user title createdAt');
      res.send(ses);
    } catch (error){
      console.error(error);
      res.status(500).send({
        message: 'Internal Server Error'
      });
    }
  })();
})

// Use sessionId to search for a Session object.
router.get('/session/:sessionId', (req, res) => {
	// 從 request 中獲取 'sessionId' 參數
	const sessionId = req.params.sessionId;

	// 檢查 'sessionId' 參數是否存在
	if (!sessionId) {
		res.status(400).send({
			message: 'Session ID is required',
		});
		return;
	}

  (async () => {
    try {
      const ses = await Session.findById(sessionId).select('_id user title messages createdAt');
      if (!ses) {
        res.status(404).send({
          message: 'Session not found',
        });
        return;
      }
      res.send(ses)
    } catch (error){
      console.error(error);
      if (error.name === 'CastError' || error.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Session not found'
        });
      } else {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      }
    }
  })();
})

// Use sessionId to delete a Session object.
router.delete('/session/:sessionId/', (req, res) => {
  const sessionId = req.params.sessionId;

  if (!sessionId) {
    res.status(400).send({
      message: 'Session ID is required',
    });
    return;
  }

  (async () => {
    try {
      const ses = await Session.findByIdAndDelete(sessionId);
      if (!ses) {
        res.status(404).send({
          message: 'Session not found',
        });
        return;
      }
      res.send({
        message: 'Session deleted'
      });
    } catch (error){
      console.error(error);
      if (error.name === 'CastError' || error.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Session not found'
        });
      } else {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      }
    }
  })();

})

// Update the title of a Session.
router.put('/session/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  const title = req.query.title

  if (!sessionId || !title) {
    res.status(400).send({
      message: 'Session ID and title is required',
    });
    return;
  }

  console.log(title);

  (async () => {
    try {
      const ses = await Session.findByIdAndUpdate(sessionId, { $set: {title} }, {new: true}).select('_id user title messages createdAt');
      if (!ses) {
        res.status(404).send({
          message: 'Session not found',
        });
        return;
      }
      res.send(ses);
    } catch (error){
      console.error(error);
      if (error.name === 'CastError' || error.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Session not found'
        });
      } else {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      }
    }
  })();

})

// Update the messages of a Session by OpenAI API.
router.put('/session/:sessionId/messages', (req, res) => {
  const sessionId = req.params.sessionId;
  const content = req.body.content;

  if (!sessionId || !content) {
    res.status(400).send({
      message: 'Content and sessionId is required',
    });
    return;
  }

  console.log(content);

  (async () => {
    try {
      var ses = await Session.findByIdAndUpdate(sessionId, { $push: {messages: content} }, {new: true});
      if (!ses) {
        res.status(404).send({
          message: 'Session not found',
        });
        return;
      }

      OpenAIChat(ses.messages).then((value) => {
        return Session.findByIdAndUpdate(sessionId, { $push: {messages: value.message.content} }, {new: true}).select('_id user title messages createdAt');
      }).then((session) => res.send(session));

    } catch (error){
      console.error(error);
      if (error.name === 'CastError' || error.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Session not found'
        });
      } else {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      }
    }
  })();

})

// ------------DIARY------------------

// 創建Diary session.
// @Author: 晴耘
router.post('/createDiary', async (req, res) => {
  const user = req.body.userId;

  if (!user) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const session = new DiarySession({
      user: user
    });

    session.save().then(data => {
      const savedDocument = {
        diaryId: data._id,
        userId: data.user,
        responseAi: data.AIresponse,
        createdAt: data.createdAt,
        content: data.content
      };
      res.send(savedDocument);
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 按下儲存鍵，更新日記內容。
// @Author: 庭瑋
router.put('/updateDiary/:diaryId', (req, res) => {
  const sessionId = req.params.diaryId;
  const content = req.body.content

  if (!sessionId || !content) {
    res.status(400).send({
      message: 'Session ID and content is required',
    });
    return;
  }

  console.log("New diary content:", content);

  (async () => {
    try {
      const ses = await DiarySession.findByIdAndUpdate(sessionId, { $push: {content: content} }, {new: true}).select('_id user content createdAt AIresponse');
      if (!ses) {
        res.status(404).send({
          message: 'Session not found',
        });
        return;
      }
      const savedDocument = {
        diaryId: ses._id,
        userId: ses.user,
        responseAi: ses.AIresponse,
        createdAt: ses.createdAt,
        content: ses.content
      }
      res.send(savedDocument);
    } catch (error){
      console.error(error);
      if (error.name === 'CastError' || error.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Session not found'
        });
      } else {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      }
    }
  })();
})

// 按下儲存鍵，更新日記內容AI回覆的部分，只會取代。
// @Author: 庭瑋
router.put('/updateDiaryResponseAi/:diaryId', (req, res) => {
  const sessionId = req.params.diaryId;
  const content = req.body.content

  if (!sessionId || !content) {
    res.status(400).send({
      message: 'Session ID and content is required',
    });
    return;
  }

  (async () => {
    try {
      const ses = await DiarySession.findByIdAndUpdate(sessionId, { $set: {AIresponse: content} }, {new: true}).select('_id user content createdAt AIresponse');
      if (!ses) {
        res.status(404).send({
          message: 'Session not found',
        });
        return;
      }
      const savedDocument = {
        diaryId: ses._id,
        userId: ses.user,
        responseAi: ses.AIresponse,
        createdAt: ses.createdAt,
        content: ses.content
      }
      res.send(savedDocument);
    } catch (error){
      console.error(error);
      if (error.name === 'CastError' || error.name === 'DocumentNotFoundError') {
        res.status(404).send({
          message: 'Session not found'
        });
      } else {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      }
    }
  })();
})

// Use userId to search for all corresponding sessions.
// @Author: 庭瑋
router.get('/getAllSessions/:userId', (req, res) => {
  const userId = req.params.userId;

	if (!userId) {
		res.status(400).send({
			message: 'User ID is required',
		});
		return;
	}

  (async () => {
    try {
      const ses = await DiarySession.find({ user: userId }).select('_id user content createdAt AIresponse');
      var array = [];
      ses.forEach(data => {
        const savedDocument = {
          diaryId: data._id,
          userId: data.user,
          responseAi: data.AIresponse,
          createdAt: data.createdAt,
          content: data.content
        };
        array.push(savedDocument);
      })
      res.send(array);
    } catch (error){
      console.error(error);
      res.status(500).send({
        message: 'Internal Server Error'
      });
    }
  })();

})

// Get the content of a Session by session ID
// @Author: 晴耘
router.get('/getSession/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;

  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    const session = await DiarySession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const sessionData = {
      Diaryid: session._id,
      user: session.user,
      AIresponse: session.AIresponse,
      content: session.content,
      createdAt: session.createdAt,
    };

    res.status(200).json(sessionData);
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError' || error.name === 'DocumentNotFoundError') {
      res.status(404).json({ error: 'Session not found' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// OpenAIChat for MoodBlog.
// @Author: 尚峰
router.post('/getAiResponse/:diaryId', async (req, res) => {
  const { userId, content } = req.body;
  const sessionId = req.params.sessionId;

  // console.log("User (from request body):", user);
  // console.log("Session ID (from request parameter):", sessionId);
  // console.log("Content (from request body):", content);

  if (!userId || !sessionId || !content) {
      return res.status(400).json({ error: 'User ID, Session ID, and content are required' });
  }

  try {
      const AIresponse = await DiaryOpenAIChat([content]);

      const session = new DiarySession({
          user: userId,
          content: content,
          AIresponse: AIresponse,
      });

      const savedSession = await session.save();

      console.log("Saved Session Data:", savedSession); 

      res.json({ message: AIresponse });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
});


module.exports = router;