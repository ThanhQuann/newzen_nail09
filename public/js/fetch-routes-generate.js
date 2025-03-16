const fs = require("fs");
const yaml = require('js-yaml');

async function generateRoutesFromApi() {
  const pageRoutes = [];
  let listProductCate = [];
  let listProductCateIdeas = [];

  try {
    // Đọc tệp YAML
  const domainName = process.cwd();

    const fileContent = fs.readFileSync(`${domainName}/content/inseason.yml`, "utf8"); // Thay 'file.yml' bằng đường dẫn tới tệp của bạn
    const fileContentIdeas = fs.readFileSync(`${domainName}/content/ideas.yml`, "utf8"); // Thay 'file.yml' bằng đường dẫn tới tệp của bạn
    const data = yaml.load(fileContent);
    const dataIdeas = yaml.load(fileContentIdeas);

    // Lọc content_block === 'inseason/hero'
    const contentBlocks = data.content_blocks || [];
    const contentBlocksIdeas = dataIdeas.content_blocks || [];
    const inseasonHeroBlock = contentBlocks.find(
      (block) => block._block_name === "inseason/hero"
    );
    const ideasHeroBlock = contentBlocksIdeas.find(
      (block) => block._block_name === "ideas/hero"
    );

    // Lấy danh sách product_list và chỉ lấy tiêu đề (title)
    const productTitles = (inseasonHeroBlock?.product_list || []).map(
      (product) => product.title
    );
    const productTitlesIdeas = (ideasHeroBlock?.product_list || []).map(
      (product) => product.title
    );
    listProductCate = productTitles
    listProductCateIdeas = productTitlesIdeas
    console.log(productTitles);
    // Kết quả: [ 'Tropical Avocado', 'Mango', 'Ginger', 'Tamarind' ]

    listProductCate.forEach((item) => {
      if (item ) {
        pageRoutes.push(`/hot/${item}`);
      }
    });
    listProductCateIdeas.forEach((item) => {
      if (item ) {
        pageRoutes.push(`/ideas/${item}`);
      }
    });
    // appendRoutesToNuxtConfig(pageRoutes);
    console.log('listProductCateIdeas : ', listProductCateIdeas);

    return pageRoutes
  } catch (error) {
    console.error("Lỗi trong quá trình tạo routes:", error);
  }
}

function appendRoutesToNuxtConfig(newRoutes) {
  const configPath = "./nuxt.config.ts";

  fs.readFile(configPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Lỗi khi đọc file nuxt.config.ts:", err);
      return;
    }

    const currentRoutesMatch = data.match(/routes:\s*(\[[^\]]*\])/);
    let currentRoutes = [];

    if (currentRoutesMatch) {
      currentRoutes = JSON.parse(currentRoutesMatch[1].replace(/'/g, '"'));
    }

    const combinedRoutes = Array.from(
      new Set([...currentRoutes, ...newRoutes])
    );

    const updatedConfig = data.replace(
      /routes:\s*\[[^\]]*\]/,
      `routes: ${JSON.stringify(combinedRoutes).replace(/"/g, "'")}`
    );

    fs.writeFile(configPath, updatedConfig, "utf-8", (err) => {
      if (err) {
        console.error("Lỗi khi ghi vào file nuxt.config.ts:", err);
        return;
      }
      console.log(
        "nuxt.config.ts đã được cập nhật thành công với các routes sản phẩm!"
      );
    });
  });
}


function convertRoutesVirtual(listContent) {
  let listRoutes = listContent
    .flat()
    .filter((cate) => cate !== undefined)
    .map((cate) => cate.text.toLowerCase().split(' ').join('-'));
  listRoutes = [...new Set(listRoutes)];
  return listRoutes;
}
 
function generateRoutes() {
  const domainName = process.cwd();
 
  const getNestedFiles = async (dir) => {
    return new Promise((resolve, reject) => {
      fs.readdir(`${domainName}/content/` + dir, async (_err, _files) => {
        if (_err) return reject(_err);
 
        let folders = _files?.filter(file => !file?.includes(".yml"));
        let notFolders = _files?.filter(file => file?.includes(".yml"));
        let nestedFiles = [];
        let listCate = [];
        let listTags = [];
        // Đọc thư mục con (folders) không đồng bộ
        await Promise.all(folders.map(async folder => {
          const filesInFolder = await getNestedFiles(dir + "/" + folder);
          nestedFiles.push(...filesInFolder);
        }));
 
        // Đọc các file YAML
        const readNotFolders = () =>{
          notFolders.map(item => {
            try {
              const yamlData = fs.readFileSync(`${domainName}/content/${dir}/${item}`, 'utf8');
              const jsonData = yaml.load(yamlData);
              if ('publish' in jsonData ) {
                if (jsonData.publish) {
                  listCate.push(jsonData.category);
                  listTags.push(jsonData.tags);
                }else{
                  var index = notFolders.indexOf(item);
                  if (index > -1) {
                    notFolders.splice(index, 1);
                  }
                  readNotFolders()
                }
              }
    
            } catch (err) {
              console.error(err);
            }
          });
        }
        readNotFolders()
 
        // Chuyển đổi routes từ category và tags
        listCate = convertRoutesVirtual(listCate);
        listTags = convertRoutesVirtual(listTags);
 
        // Thêm các file YAML vào danh sách
        nestedFiles.push(...notFolders.map(file => dir + "/" + file));

        // Thêm category và tags vào nestedFiles
        listCate.forEach((cate) => nestedFiles.push(dir + "/" + 'category/' + cate + '.yml'));
        listTags.forEach((tags) => nestedFiles.push(dir + "/" + 'tags/' + tags + '.yml'));
 
        resolve(nestedFiles);
      });
    });
  };
 
  // Đọc thư mục /content
  fs.readdir(`${domainName}/content`, async (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
 
    let folders = files?.filter(file => !file?.includes(".yml"));
    let nestedFiles = [];
 
    // Đọc tất cả các thư mục cấp cao nhất không đồng bộ
    await Promise.all(folders.map(async folder => {
      const filesInFolder = await getNestedFiles(folder);
      nestedFiles.push(...filesInFolder);
    }));
 
    // Lọc các file YAML
    files = [...files, ...nestedFiles]?.filter(file => file.includes(".yml"));
 
    // Tạo routes từ danh sách file YAML
    let routes = files.map(file => {
      return '/' + file
        .replace('index.yml', '')
        .replace('.yml', '');
    });
 
    // Đọc và sửa file nuxt.config.ts
    fs.readFile(`${domainName}/nuxt.config.ts`, 'utf-8', async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const listRouteProduct = await generateRoutesFromApi()
        routes = [...routes, listRouteProduct].flat()
        let replaced = data.replace(/routes: \[.*\]/, `routes: ${JSON.stringify(routes)}`).replaceAll('\"', '\'');
        let replace2 = replaced.replace(`dirs: ['~/components']`, `dirs: ['~/components', '~/plugin']`);
 
        // Write result back to nuxt.config.ts
        fs.writeFile(`${domainName}/nuxt.config.ts`, replace2, 'utf-8', function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });
}
 
generateRoutes()