
export interface INodemailerService {
    sendMail(email: string, subject: string, text: string): Promise<void>;
  }