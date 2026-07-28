const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = request.headers.get("accept") || "";

    if (url.pathname.endsWith("/")) {
      url.pathname += "index.html";
    }

    let response = await env.ASSETS.fetch(new Request(url, request));

    if (response.status === 404 && accept.includes("text/html")) {
      url.pathname = "/404.html";
      response = await env.ASSETS.fetch(new Request(url, request));
    }

    return response;
  },
};

export default worker;
