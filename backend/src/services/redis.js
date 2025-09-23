const { createClient } = require('redis');

class RedisCacheService {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  async connect() {
    try {
      const redisHost = process.env.REDIS_HOST || 'localhost';
      const redisPort = process.env.REDIS_PORT || 6379;
      console.log(`Connecting to Redis at ${redisHost}:${redisPort}`)
      this.client = createClient({
        host: redisHost,
        port: redisPort,
        family: 4, // Force IPv4
        socket: {
          family: 4 // Additional IPv4 enforcement
        },

      });

      this.client.on('error', (err) => {
        console.error('Redis Client Error:', err);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('Connected to Redis');
        this.isConnected = true;
      });

      this.client.on('ready', () => {
        console.log('Redis client ready');
        this.isConnected = true;
      });

      this.client.on('end', () => {
        console.log('Redis connection ended');
        this.isConnected = false;
      });

      await this.client.connect();
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      this.isConnected = false;
    }
  }

  async getAccessToken() {
    try {
      if (!this.isConnected || !this.client) {
        return null;
      }
      return await this.client.get('accessToken');
    } catch (error) {
      console.error('Error getting access token from Redis:', error);
      return null;
    }
  }

  async getRefreshToken() {
    try {
      if (!this.isConnected || !this.client) {
        return null;
      }
      return await this.client.get('refreshToken');
    } catch (error) {
      console.error('Error getting refresh token from Redis:', error);
      return null;
    }
  }

  async setTokens(accessToken, refreshToken) {
    try {
      if (!this.isConnected || !this.client) {
        throw new Error('Redis client not connected');
      }

      await this.client.set('accessToken', accessToken);
      await this.client.set('refreshToken', refreshToken);
    } catch (error) {
      console.error('Error setting tokens in Redis:', error);
      throw error;
    }
  }

  async setAccessToken(accessToken) {
    try {
      if (!this.isConnected || !this.client) {
        throw new Error('Redis client not connected');
      }
      await this.client.set('accessToken', accessToken);
    } catch (error) {
      console.error('Error setting access token in Redis:', error);
      throw error;
    }
  }

  async setRefreshToken(refreshToken) {
    try {
      if (!this.isConnected || !this.client) {
        throw new Error('Redis client not connected');
      }
      await this.client.set('refreshToken', refreshToken);
    } catch (error) {
      console.error('Error setting refresh token in Redis:', error);
      throw error;
    }
  }

  async clearTokens() {
    try {
      if (!this.isConnected || !this.client) {
        return;
      }
      await this.client.del('accessToken');
      await this.client.del('refreshToken');
    } catch (error) {
      console.error('Error clearing tokens from Redis:', error);
    }
  }

  hasValidToken() {
    // For now, we'll check if we have a cached token
    // In a more sophisticated implementation, you might want to check token expiration
    return this.isConnected;
  }

  async disconnect() {
    try {
      if (this.client) {
        await this.client.quit();
      }
    } catch (error) {
      console.error('Error disconnecting from Redis:', error);
    }
  }
}

module.exports = new RedisCacheService();
