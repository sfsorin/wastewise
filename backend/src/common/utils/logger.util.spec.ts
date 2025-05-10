import { Logger } from '@utils/logger.util';

describe('Logger', () => {
  let logger: Logger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new Logger('TestContext');
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleDebugSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  describe('info', () => {
    it('should log info message with context', () => {
      logger.info('Test info message');
      expect(consoleLogSpy).toHaveBeenCalledWith('[INFO] [TestContext] Test info message', '');
    });

    it('should log info message with data', () => {
      const data = { key: 'value' };
      logger.info('Test info message', data);
      expect(consoleLogSpy).toHaveBeenCalledWith('[INFO] [TestContext] Test info message', data);
    });
  });

  describe('warn', () => {
    it('should log warning message with context', () => {
      logger.warn('Test warning message');
      expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN] [TestContext] Test warning message', '');
    });

    it('should log warning message with data', () => {
      const data = { key: 'value' };
      logger.warn('Test warning message', data);
      expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN] [TestContext] Test warning message', data);
    });
  });

  describe('error', () => {
    it('should log error message with context', () => {
      logger.error('Test error message');
      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR] [TestContext] Test error message', '', '');
    });

    it('should log error message with trace', () => {
      const trace = 'Error stack trace';
      logger.error('Test error message', trace);
      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR] [TestContext] Test error message', trace, '');
    });

    it('should log error message with trace and data', () => {
      const trace = 'Error stack trace';
      const data = { key: 'value' };
      logger.error('Test error message', trace, data);
      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR] [TestContext] Test error message', trace, data);
    });
  });

  describe('debug', () => {
    it('should log debug message with context', () => {
      logger.debug('Test debug message');
      expect(consoleDebugSpy).toHaveBeenCalledWith('[DEBUG] [TestContext] Test debug message', '');
    });

    it('should log debug message with data', () => {
      const data = { key: 'value' };
      logger.debug('Test debug message', data);
      expect(consoleDebugSpy).toHaveBeenCalledWith('[DEBUG] [TestContext] Test debug message', data);
    });
  });
});
