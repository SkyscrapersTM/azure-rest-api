const { app } = require("@azure/functions");
const { updateEntity } = require("../../services/tableService");

app.http("UpdatePost", {
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "blog-post/{blog}/{id}",
  handler: async (request, context) => {
    try {
      const body = await request.json();

      if (!body) {
        return {
          status: 400,
          body: "Please pass request body",
        };
      }

      const { title, content } = body;

      if (!title && !content) {
        return {
          status: 400,
          body: "Please pass title and content",
        };
      }

      const { blog, id } = request.params;

      const entity = {
        PartitionKey: blog,
        RowKey: id.toString(),
      };

      if (title) entity.title = title;

      if (content) entity.content = content;

      await updateEntity("Posts", entity);
    } catch (error) {
      return {
        status: 500,
        body: error.message,
      };
    }
  },
});
