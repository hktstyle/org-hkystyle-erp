/**
 * Copyright © 2017 hkystyle. All rights reserved.
 */
package org.hkystyle.erp.domain.models.page;

import java.io.Serializable;

/**
 * 分页查询 DTO
 * Created by hukaiyang on 2017/10/15.
 */
public class PagerDTO implements Serializable {
    /**
     * 当前页
     */
    private int pageIndex = 0;

    /**
     * 分页大小
     */
    private int pageSize = 20;

    /**
     * 获取 当前页
     */
    public int getPageIndex() {
        return this.pageIndex;
    }

    /**
     * 设置 当前页
     */
    public void setPageIndex(int pageIndex) {
        if (0 < this.pageIndex) {
            this.pageIndex = pageIndex - 1;
        }
    }

    /**
     * 获取 分页大小
     */
    public int getPageSize() {
        return this.pageSize;
    }

    /**
     * 设置 分页大小
     */
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
}
