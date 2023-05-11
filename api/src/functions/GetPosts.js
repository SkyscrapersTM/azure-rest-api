const { app } = require("@azure/functions");
const azure = require("azure-storage");
const { queryEntities } = require("../../services/tableService");

app.http("GetPosts", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "blog-posts/{blog}",
  handler: async (request, context) => {
    try {
      const blog = request.params.blog;

      let query = new azure.TableQuery().where("PartitionKey eq ?", blog);

      const result = await queryEntities("Posts", query);

      return {
        jsonBody: result,
      };
    } catch (error) {
      return {
        status: 500,
        body: error.message,
      };
    }
  },
});