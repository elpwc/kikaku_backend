import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 请求上下文
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR; // 获取异常状态码
    console.log('filter: ' + status);
    // 设置错误信息
    const msg = exception.message
      ? exception.message
      : `${
          status >= 500
            ? '服务器错误（Service Error）'
            : '客户端错误（Client Error）'
        }`;

    const nowTime = new Date().getTime();

    const errorResponse = {
      data: {},
      msg,
      code: status,
      //date: nowTime,
      //path: request.url,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
