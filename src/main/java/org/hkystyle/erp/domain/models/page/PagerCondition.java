
package org.hkystyle.erp.domain.models.page;

import java.io.Serializable;

/**
 * Created by hukaiyang on 2017/10/14.
 */
public class PagerCondition implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer currentPage = 1;
    private Integer pageSize = 20;

    public PagerCondition() {
    }

    public PagerCondition(Integer currentPage) {
        if (currentPage != null) {
            this.currentPage = currentPage;
        }

        this.pageSize = 20;
    }

    public PagerCondition(Integer currentPage, Integer pageSize) {
        if (currentPage != null) {
            this.currentPage = currentPage;
        }

        this.pageSize = pageSize;
    }

    public Integer getCurrentPage() {
        return this.currentPage;
    }

    public Integer getLimitnum() {
        return this.getPageSize();
    }

    public Integer getOffset() {
        return (this.getCurrentPage() - 1) * this.getPageSize();
    }

    public Integer getPageSize() {
        return this.pageSize != null && this.pageSize > 0 ? this.pageSize : Integer.valueOf(20);
    }

    public Integer getPreviousPage() {
        return this.currentPage > 0 ? this.currentPage - 1 : 0;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer startRow() {
        int startRow = 0;
        if (this.currentPage != 1) {
            startRow = (this.currentPage - 1) * this.pageSize;
        }

        return startRow;
    }
}
