var express = require('express'),
    mongoose  = require('mongoose');

var xmla   =  require("../lib/Xmla.js"),
    Connections = require("../model/connections");

var router = express.Router(),
    Xmla   =  xmla.Xmla;


router.post('/', function(req, res) {
  // console.log(req.body.mdxQuery);
  // console.log("inside route/execute");
  
      var statement  = req.body.statement,
          connId   = req.body.connId,
          properties = {};
      properties[Xmla.PROP_DATASOURCEINFO]  = req.body.dataSource;
      properties[Xmla.PROP_CATALOG]         = req.body.catalog;
      /*available formats:
        .PROP_FORMAT_MULTIDIMENSIONAL
        .PROP_FORMAT_TABULAR
      */
      properties[Xmla.PROP_FORMAT]          = Xmla.PROP_FORMAT_MULTIDIMENSIONAL;
      /*available axis formats
        (applicable to .PROP_FORMAT_MULTIDIMENSIONAL):
            TupleFormat
            ClusterFormat
            ClusterFormat
      */
      properties[Xmla.PROP_AXISFORMAT]      =  "TupleFormat";

    function getTupleName(tuple) {
        var name    = "",
            members = tuple.members,
            n = members.length;

        for (var i=0; i < n; i++) {
            if (name.length) name += ".";
            name += members[i][Xmla.Dataset.Axis.MEMBER_CAPTION];
        }
        return name;
    }

    var dataSet={};

    function getDatafrmDataset(obj){
      var columnAxis=[];
      var rowAxis=[];
      var cellData=[];
        //Constructing Column-Axis or Axis0
        obj.getColumnAxis().eachTuple(function(tuple){
          columnAxis[columnAxis.length]={Member:tuple.members};
        });

        //Constructing Row-Axis or Axis1
        obj.getRowAxis().eachTuple(function(tuple){
          rowAxis[rowAxis.length]={Member:tuple.members};
        });

        //May Require something on SlicerAxis

        //Constructing the Cell Data
        var cell=obj.getCellset();
        if(cell.hasMoreCells){
              cellData[0]={
                  "CellOrdinal"  : cell.readCell().ordinal,
                  "FmtValue"      : cell.readCell().FmtValue
                };

          while(cell.nextCell()!=-1)
          {  cellData[cellData.length]={
                  "CellOrdinal"  : cell.readCell().ordinal,
                  "FmtValue"      : cell.readCell().FmtValue
              };
            }

      }
      dataSet.Axes={"Axis":[columnAxis,rowAxis]};
      dataSet.CellData={"Cell":cellData};
    }

        Connections.findById(connId,function(err,conn){
          var xmlaRequest = {
            async       : true,
            url         : conn.getServer(),
            properties  : properties,
            statement   : statement,

            success:function(xmla,xmlaRequest,xmlaResponse) {
                var obj=xmlaResponse;
                if(obj instanceof Xmla.Dataset)
                  {
                    getDatafrmDataset(obj);
                  }
                  res.json(dataSet);
                  // console.log(JSON.stringify(dataSet,null,2));
              },
            error: function(xmla, xmlaRequest, exception) {
                  res.json({status: "error", info: exception});
            },
            callback: function(){
              res.end();
            }
          };
          var x = new xmla.Xmla();
          var result =x.execute(xmlaRequest);
          //////////


        });
});

module.exports = router;