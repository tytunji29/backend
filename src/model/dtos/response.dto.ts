// src/common/dtos/response.dto.ts
export class ResponseDto<T> {
  status: string;      // "success" or "error"
  message: string;     // informative message
  data?: T;            // the actual payload

  constructor(status: string, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}



// user.dto.ts
export class UserDto {
  id: number;
  fullName: string;
  email: string;
  role: string;
}
