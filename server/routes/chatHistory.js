const chatHistory = (app, getUserIds, setVisited) => {
  app.post("/chat/history", (req, res) => {
    const { username, target } = req.body;
    getUserIds(username, target, (userA, userB) => {
      pool.query(
        `SELECT * FROM message WHERE from_username='${userA}' AND to_username='${userB}' OR from_username='${userB}' AND to_username='${userA}' ORDER BY message_date ASC`,
        function(error, results) {
          if (results) {
            setVisited(userA, userB);
            res.status(200).send(results);
          } else {
            console.log(error);
            res.status(500).send();
          }
        }
      );
    });
  });
};

const chatLog = (req, res) => {
  // const username = socket.username;
  const { user_id } = req.body;
  pool.query(
    `SELECT * FROM message WHERE to_username='${user_id}' ORDER BY visited ASC`,
    function(error, results) {
      if (results) {
        res.status(200).send(results);
      } else {
        console.log(error);
        res.status(500).send();
      }
    }
  );
};

module.exports.chatHistory = chatHistory;
module.exports.chatLog = chatLog;
