const api = {
  async getArticles(page) {
    try {
      const res = await fetch(`https://blog-platform.kata.academy/api/articles?limit=5&offset=${5 * (page - 1)}`);
      if (!res.ok) return false;
      return await res.json();
    } catch {
      return false;
    }
  },

  async getArticle(slug) {
    try {
      let res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`);
      if (!res.ok) return false;
      res = await res.json();
      return res.article;
    } catch {
      return false;
    }
  },

  async createAcc(data) {
    try {
      let res = await fetch('https://blog-platform.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ user: data }),
      });
      let error = false;
      if (!res.ok) error = true;
      res = await res.json();
      if (error && 'message' in res.errors) return ['message', res.errors];
      if (error) return ['fields', res.errors];
      return ['ok', res.user];
    } catch {
      return false;
    }
  },

  async logIn(data) {
    try {
      let res = await fetch('https://blog-platform.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ user: data }),
      });
      let error = false;
      if (!res.ok) error = true;
      res = await res.json();
      if (error && 'message' in res.errors) return ['message', res.errors];
      if (error) return ['fields', res.errors];
      return ['ok', res.user];
    } catch {
      return false;
    }
  },

  async getByToken(token) {
    try {
      let res = await fetch('https://blog-platform.kata.academy/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });
      if (!res.ok) return false;
      res = await res.json();
      return res.user;
    } catch {
      return false;
    }
  },

  async editProfile(data) {
    try {
      let res = await fetch('https://blog-platform.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data[0]}`,
        },
        body: JSON.stringify({ user: data[1] }),
      });
      let error = false;
      if (!res.ok) error = true;
      res = await res.json();
      if (error && 'message' in res.errors) return ['message', res.errors];
      if (error) return ['fields', res.errors];
      return ['ok', res.user];
    } catch {
      return false;
    }
  },

  async setArticle(data) {
    try {
      let res = await fetch('https://blog-platform.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data[0]}`,
        },
        body: JSON.stringify({ article: data[1] }),
      });
      let error = false;
      if (!res.ok) error = true;
      res = await res.json();
      if (error && 'message' in res.errors) return ['message', res.errors];
      if (error) return ['fields', res.errors];
      return ['ok', res.article];
    } catch {
      return false;
    }
  },

  async updateArticle(data) {
    try {
      let res = await fetch(`https://blog-platform.kata.academy/api/articles/${data[1]}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data[0]}`,
        },
        body: JSON.stringify({ article: data[2] }),
      });
      let error = false;
      if (!res.ok) error = true;
      res = await res.json();
      if (error && 'message' in res.errors) return ['message', res.errors];
      if (error) return ['fields', res.errors];
      return ['ok', res.article];
    } catch {
      return false;
    }
  },

  async deleteArticle(data) {
    try {
      let res = await fetch(`https://blog-platform.kata.academy/api/articles/${data[1]}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${data[0]}`,
        },
      });
      if (!res.ok) return false;
      return true;
    } catch {
      return false;
    }
  },

  async favoriteArticle(data) {
    try {
      let res = await fetch(`https://blog-platform.kata.academy/api/articles/${data[1]}/favorite`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${data[0]}`,
        },
      });
      if (!res.ok) return false;
      res = await res.json();
      return res.article;
    } catch {
      return false;
    }
  },

  async unfavoriteArticle(data) {
    try {
      let res = await fetch(`https://blog-platform.kata.academy/api/articles/${data[1]}/favorite`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${data[0]}`,
        },
      });
      if (!res.ok) return false;
      res = await res.json();
      return res.article;
    } catch {
      return false;
    }
  },

  async getArticlesToken(data) {
    try {
      const res = await fetch(`https://blog-platform.kata.academy/api/articles?limit=5&offset=${5 * (data[1] - 1)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data[0]}`,
        },
      });
      if (!res.ok) return false;
      return await res.json();
    } catch {
      return false;
    }
  },

  async getArticleToken(data) {
    try {
      let res = await fetch(`https://blog-platform.kata.academy/api/articles/${data[1]}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${data[0]}`,
        },
      });
      if (!res.ok) return false;
      res = await res.json();
      return res.article;
    } catch {
      return false;
    }
  },
};

export default api;
