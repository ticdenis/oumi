import { event } from '@oumi-package/shared/lib/core';

import http from 'http';

import { RabbitMQConfig } from './config';
import { RabbitMQProducer } from './producer';
import { RabbitMQSubscriber } from './subscriber';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});

server.listen(7777, '127.0.0.1', async () => {
  const config = new RabbitMQConfig();

  const producer = new RabbitMQProducer(config);

  const subscriber = new RabbitMQSubscriber(producer);

  producer.subscribe(subscriber);

  const someEvent = event({
    adria: 20,
    denis: 1,
  });

  await producer.publish(someEvent);
});
