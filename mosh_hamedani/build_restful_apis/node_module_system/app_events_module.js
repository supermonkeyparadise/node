// class ===> 第一個字大寫
const { Logger } = require('./logger');

const eventName = 'messageLogged';
// new instance
const logger = new Logger();

// Register the listener
logger.on(eventName, e => {
  console.log('Listener called', e);
});

logger.log('message');
