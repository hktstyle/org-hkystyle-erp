
package org.hkystyle.erp.domain.models.page;

/**
 * Created by hukaiyang on 2017/10/14.
 */
public class Pager extends PagerCondition {
    private static final long serialVersionUID = 1L;
    private Integer recordCount;
    private Integer totalPage;

    public Pager() {
    }

    public Pager(Integer currentPage, Integer pageSize, Integer recordCount) {
        super(currentPage, pageSize);
        this.recordCount = recordCount;
        Integer totalPageSize = recordCount / pageSize;
        Integer remailder = recordCount % pageSize;
        if (remailder > 0) {
            totalPageSize = totalPageSize + 1;
        }

        this.totalPage = totalPageSize;
    }

    public Pager(PagerCondition pageCondition, Integer recordCount) {
        this.setCurrentPage(pageCondition.getCurrentPage());
        this.setPageSize(pageCondition.getPageSize());
        this.setRecordCount(recordCount);
        this.setTotalPage((recordCount + this.getPageSize() - 1) / this.getPageSize());
    }

    public Integer getRecordCount() {
        return this.recordCount;
    }

    public void setRecordCount(Integer recordCount) {
        this.recordCount = recordCount;
    }

    public Integer getTotalPage() {
        return this.totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }
}
