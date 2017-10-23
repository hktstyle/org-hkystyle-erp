
package org.hkystyle.erp.domain.models.product;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 产品
 * Created by hukaiyang on 2017/10/15.
 */
public class Product implements Serializable {
    private Integer id;

    /**
     * 产品名称
     */
    private String name;

    /**
     * 销售单位
     */
    private String sellingUnit;

    /**
     * 销售价
     */
    private BigDecimal sellingPrice;

    /**
     * 规格名称
     */
    private String specName;

    /**
     * 状态
     * org.hkystyle.erp.domain.models.product.enums.ProductState
     */
    private Integer state;

    /**
     * 创建时间
     */
    private String createTime;

    /**
     * 最后修改时间
     */
    private String lastUpdateTime;

    /**
     * 创建人 Id
     */
    private Integer createUserId;

    /**
     * 最后修改人 Id
     */
    private Integer lastUpdateUserId;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取 产品名称
     */
    public String getName() {
        return this.name;
    }

    /**
     * 设置 产品名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取 销售单位
     */
    public String getSellingUnit() {
        return this.sellingUnit;
    }

    /**
     * 设置 销售单位
     */
    public void setSellingUnit(String sellingUnit) {
        this.sellingUnit = sellingUnit;
    }

    /**
     * 获取 销售价
     */
    public BigDecimal getSellingPrice() {
        return this.sellingPrice;
    }

    /**
     * 设置 销售价
     */
    public void setSellingPrice(BigDecimal sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    /**
     * 获取 规格名称
     */
    public String getSpecName() {
        return this.specName;
    }

    /**
     * 设置 规格名称
     */
    public void setSpecName(String specName) {
        this.specName = specName;
    }

    /**
     * 获取 创建时间
     */
    public String getCreateTime() {
        return this.createTime;
    }

    /**
     * 设置 创建时间
     */
    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取 最后修改时间
     */
    public String getLastUpdateTime() {
        return this.lastUpdateTime;
    }

    /**
     * 设置 最后修改时间
     */
    public void setLastUpdateTime(String lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    /**
     * 获取 创建人 Id
     */
    public Integer getCreateUserId() {
        return this.createUserId;
    }

    /**
     * 设置 创建人 Id
     */
    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    /**
     * 获取 最后修改人 Id
     */
    public Integer getLastUpdateUserId() {
        return this.lastUpdateUserId;
    }

    /**
     * 设置 最后修改人 Id
     */
    public void setLastUpdateUserId(Integer lastUpdateUserId) {
        this.lastUpdateUserId = lastUpdateUserId;
    }

    /**
     * 获取 状态
     */
    public Integer getState() {
        return this.state;
    }

    /**
     * 设置 状态
     */
    public void setState(Integer state) {
        this.state = state;
    }
}
