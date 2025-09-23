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
        family: 4, 
        socket: {
          family: 4 
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

      // Set access token with 1 day expiration (86400 seconds)
      await this.client.setEx('accessToken', 86400, accessToken);
      // Set refresh token with 7 days expiration (604800 seconds)
      await this.client.setEx('refreshToken', 604800, refreshToken);
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
      // Set access token with 1 day expiration (86400 seconds)
      await this.client.setEx('accessToken', 86400, accessToken);
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
      // Set refresh token with 7 days expiration (604800 seconds)
      await this.client.setEx('refreshToken', 604800, refreshToken);
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

  async hasValidToken() {
    try {
      if (!this.isConnected || !this.client) {
        return false;
      }

      // Check if access token exists and is not expired
      const accessToken = await this.client.get('accessToken');
      return accessToken !== null;
    } catch (error) {
      console.error('Error checking token validity:', error);
      return false;
    }
  }

  async hasValidRefreshToken() {
    try {
      if (!this.isConnected || !this.client) {
        return false;
      }

      // Check if refresh token exists and is not expired
      const refreshToken = await this.client.get('refreshToken');
      return refreshToken !== null;
    } catch (error) {
      console.error('Error checking refresh token validity:', error);
      return false;
    }
  }
  async isAccessTokenExpired() {
    try {
      if (!this.isConnected || !this.client) {
        return true;
      }

      const ttl = await this.client.ttl('accessToken');
      // TTL returns -2 if key doesn't exist, -1 if key exists but has no expiration
      return ttl === -2 || ttl === -1;
    } catch (error) {
      console.error('Error checking access token expiration:', error);
      return true;
    }
  }

  async isRefreshTokenExpired() {
    try {
      if (!this.isConnected || !this.client) {
        return true;
      }

      const ttl = await this.client.ttl('refreshToken');
      // TTL returns -2 if key doesn't exist, -1 if key exists but has no expiration
      return ttl === -2 || ttl === -1;
    } catch (error) {
      console.error('Error checking refresh token expiration:', error);
      return true;
    }
  }

  async getAccessTokenTTL() {
    try {
      if (!this.isConnected || !this.client) {
        return -2;
      }
      return await this.client.ttl('accessToken');
    } catch (error) {
      console.error('Error getting access token TTL:', error);
      return -2;
    }
  }

  async getRefreshTokenTTL() {
    try {
      if (!this.isConnected || !this.client) {
        return -2;
      }
      return await this.client.ttl('refreshToken');
    } catch (error) {
      console.error('Error getting refresh token TTL:', error);
      return -2;
    }
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
