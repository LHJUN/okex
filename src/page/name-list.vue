<template>
    <el-row>
        <el-col :span="16" :offset="4">

            <!-- Header AD-->
            <el-row type="flex" class="ad-box header-ad-box">
                <img src="../../static/img/ad/header_banner.png" class="ad-img header-ad-img"/>
                <el-row class="ad-tips"><a href="#">广告</a></el-row>
            </el-row>

            <el-row>
                <el-col :span="19" class="left-box" style="display: flex;flex-direction: column">
                    <h1 style="text-align: center">Old Man Names</h1>
                    <div style="text-align: center">
                        Old man names like Max and Sam and Henry have been used for babies for so long now that they no
                        longer sound like old man names. But don't worry,
                        there are plenty more where those came from. To qualify as a cool old man name, a name has to
                        feel both classic and slightly moth-eaten,
                        like the perfect vintage suit. Here are the names for boys we consider Old Man Names.
                    </div>
                    <div style="margin-top: 20px; margin-bottom: 20px">
                        <el-pagination
                                @size-change="refreshNameList"
                                layout="total, sizes, prev, pager, next, jumper"
                                :current-page.sync="listPagination.pageIndex"
                                :page-size.sync="listPagination.pageSize"
                                @current-change="refreshNameList"
                                :page-sizes="[20, 50, 100, 300]"
                                :total="listPagination.total">
                        </el-pagination>
                    </div>
                    <div v-for="item in nameList">
                        <div style="margin-top: 15px; margin-bottom: 15px">
                            <div class="name">{{item.label}}</div>
                            <div style="display: flex; align-items: center">
                                <span>Gender: M</span>
                                <el-button type="warning" icon="el-icon-star-off" size="small"
                                           style="margin-left: 10px"></el-button>
                                <el-button type="success" icon="el-icon-close" size="small"
                                           style="margin-left: 2px"></el-button>
                            </div>
                            <div style="margin-top: 10px">
                                {{ item.information.common }}
                                <a href="#" style="text-decoration:none">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 20px; margin-bottom: 20px">
                        <el-pagination
                                @size-change="refreshNameList"
                                layout="total, sizes, prev, pager, next, jumper"
                                :current-page.sync="listPagination.pageIndex"
                                :page-size.sync="listPagination.pageSize"
                                @current-change="refreshNameList"
                                :page-sizes="[20, 50, 100, 300]"
                                :total="listPagination.total">
                        </el-pagination>
                    </div>
                </el-col>
                <el-col :span="5" class="right-box">
                    <el-row type="flex" class="ad-box right-ad-box">
                        <img src="../../static/img/ad/right_banner.jpg" class="ad-img right-ad-img"/>
                        <el-row class="ad-tips"><a href="#">广告</a></el-row>
                    </el-row>
                </el-col>
            </el-row>

        </el-col>
    </el-row>
</template>

<script>
  import { getNameList, getNameListByPage} from '@/api/name.client.gw';

  export default {
    data() {
      return {
        listPagination: {
          pageIndex: 1,
          pageSize: 20,
          total: 0
        },
        nameList: [],
      };
    },
    components: {},
    mounted() {
      this.refreshNameList();
    },
    computed: {},
    methods: {
      async refreshNameList() {
        const res = await getNameListByPage({
          pageIndex: this.listPagination.pageIndex - 1,
          pageSize: this.listPagination.pageSize
        });
        this.nameList = res.data.content.names;
        this.listPagination.total = res.data.content.total;
      }
    }
  };
</script>

<style scoped>
    * {
        transition: all .3s ease-in-out;
    }

    .ad-box {
        overflow: hidden;
        flex-direction: column;
        border-radius: 4px;
    }

    .right-ad-box {
        padding-left: 20px;
        margin-bottom: 40px;
    }

    .left-ad-box {
        padding-right: 20px;
        margin-bottom: 40px;
    }

    .ad-img {
        object-fit: cover;
        width: 100%;
        height: 640px;
    }

    .ad-tips {
        background-color: #ededed;
        text-align: center;
        font-size: 10px;
        padding: 1px;
        letter-spacing: 2px;
    }

    .header-ad-box {
        margin: 20px 0;
    }

    .right-ad-box {
        padding-left: 20px;
        margin-bottom: 40px;
    }

    .header-ad-img {
        height: 120px;
    }

    .ad-img {
        object-fit: cover;
        width: 100%;
    }

    .right-ad-img {
        height: 640px;
    }

    .left-box {
        padding-right: 20px;
        margin-bottom: 30px;
        border-right: 1px solid rgba(0, 0, 0, .2);
    }

    .name {
        font-size: 1.5em;
        color: #719398;
    }

</style>

