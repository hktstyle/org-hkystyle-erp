/**
 * Copyright © 2017 hkystyle. All rights reserved.
 */
package org.hkystyle.erp.results;

import org.hkystyle.erp.domain.models.page.PageList;

import java.io.Serializable;
import java.util.List;

/**
 * Created by hukaiyang on 2017/10/14.
 */
public class PageListResult<T> extends BaseResult {
    private List<T> datas;

    private int totalCount;

    private int totalPage;

    public List<T> getDatas() {
        return this.datas;
    }

    public void setDatas(List<T> datas) {
        this.datas = datas;
    }

    public int getTotalCount() {
        return this.totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getTotalPage() {
        return this.totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }
}
