import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Assistant } from 'src/entities/assistant.entity';
import jwt from 'src/utils/jwt';

@Injectable()
export class TokenAssistantMiddleWare implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    const { headers } = req;

    if (!headers.autharization) {
      throw new HttpException(
        'Bad Request: Authorization header missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = headers.authorization; // Extract the token from the "Authorization" header

    try {
      const decodedToken = jwt.verify(token); // Verify the token using your JWT utility function
      const assistantId = decodedToken?.id; // Assuming the decoded token contains the assistant's ID

      if (!assistantId) {
        throw new Error('Assistant ID not found in token');
      }

      const assistant = await Assistant.findOne(assistantId); // Fetch the assistant from the database using the ID

      if (!assistant) {
        throw new Error('Assistant not found');
      }

      // You can perform additional checks here, such as verifying other fields in the token or comparing them with the fetched assistant's properties.

      // Attach the assistant object or ID to the request object for further processing if needed
      // req.assistant = assistant;
      // req.assistantId = assistantId;

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
