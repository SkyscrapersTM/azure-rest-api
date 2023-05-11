const { app } = require("@azure/functions");
const { deleteEntity } = require("../../services/tableService");

app.http("DeletePost", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "blog-post/{blog}/{id}",
  handler: async (request, context) => {
    try {
      const { blog, id } = request.params;

      const entity = {
        PartitionKey: blog,
        RowKey: id.toString(),
      };

      await deleteEntity("Posts", entity);
    } catch (error) {
      return {
        status: 500,
        body: error.message,
      };
    }
  },
});
