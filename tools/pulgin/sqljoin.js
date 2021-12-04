const sqlJoin = (function methods() {
  const whereResolve = function (_type, whereSwitch) {
    let type = _type;
    if (whereSwitch.where) type += ' WHERE ';
    const keyAry = whereSwitch && whereSwitch.whereProp ? whereSwitch.whereProp : [];
    if (keyAry.length) {
      for (let i = 0; i < keyAry.length; i += 1) {
        const c = keyAry[i];
        if (typeof c === 'object') {
          for (const key in c) {
            if (key !== 'operator') type += `\`${key}\`${c.operator ? c.operator : '='}'${c[key]}'`;
          }
        } else if (/(AND)?(OR)?/.test(c)) {
          type += ` ${c} `;
        } else if (/(\()?(\))?/.test(c)) {
          type += c;
        }
      }
    }
    const likeKeyArr = whereSwitch.likeProp ? Object.keys(whereSwitch.likeProp) : [];
    if (likeKeyArr.length) {
      if (likeKeyArr.length > 1) {
        for (let j = 0; j < likeKeyArr.length; j += 1) {
          const cur = likeKeyArr[j];
          if (j === likeKeyArr.length - 1) {
            type += `${cur} LIKE '%${whereSwitch.likeProp[cur]}%'`;
          } else {
            type += `${cur} LIKE '%${whereSwitch.likeProp[cur]}%' AND `;
          }
        }
      } else {
        for (const key in whereSwitch.likeProp) {
          type += `${key} LIKE  '%${whereSwitch.likeProp[key]}%'`;
        }
      }
    }
    return type;
  };
  return (sqlType, tableName, whereSwitch, limitSwitch) => {
    let SELECT = '';
    let UPDATE = '';
    let DELETE = '';
    let INSERT = '';
    switch (sqlType.type) {
      case 'SELECT': {
        SELECT = 'SELECT ';
        if (sqlType.distinct) SELECT += ' DISTINCT ';
        const prop = [...sqlType.prop];
        if (prop && prop.length) {
          for (let i = 0; i < prop.length; i += 1) {
            const cur = prop[i];
            if (i === prop.length - 1) {
              SELECT += `\`${cur}\``;
            } else {
              SELECT += `\`${cur}\`,`;
            }
          }
        } else {
          SELECT += ' *';
        }
        SELECT += ` FROM \`${tableName}\``;
        if (whereSwitch) {
          SELECT = whereResolve(SELECT, whereSwitch);
        }

        const orderArr = sqlType.orderProp ? Object.keys(sqlType.orderProp) : [];
        if (orderArr.length) {
          SELECT += ' ORDER BY ';
          for (let m = 0; m < orderArr.length; m += 1) {
            const c = orderArr[m];
            if (m === orderArr.length - 1) {
              if (sqlType.orderProp[c]) {
                SELECT += `${c} ASC`;
              } else {
                SELECT += `${c} DESC`;
              }
            } else if (sqlType.orderProp[c]) {
              SELECT += `${c} ASC, `;
            } else {
              SELECT += `${c} DESC, `;
            }
          }
        }

        if (limitSwitch && limitSwitch.limit) {
          SELECT += ` LIMIT ${limitSwitch.num}`;
        }

        break;
      }
      case 'UPDATE': {
        UPDATE = 'UPDATE ';
        UPDATE += `${tableName} SET `;
        const prop = { ...sqlType.prop };
        const updateKeys = Object.keys(prop);
        for (let i = 0; i < updateKeys.length; i += 1) {
          const cur = updateKeys[i];
          // console.log(sqlType.prop[cur])
          if (prop[cur] && typeof prop[cur] === 'string') {
            prop[cur] = prop[cur].replace(/'/g, "''");
          }
          if (i === updateKeys.length - 1) {
            UPDATE += `\`${cur}\` ='${prop[cur]}'`;
          } else {
            UPDATE += `\`${cur}\` ='${prop[cur]}', `;
          }
        }
        if (whereSwitch && whereSwitch.where) {
          UPDATE = whereResolve(UPDATE, whereSwitch);
        }
        if (limitSwitch && limitSwitch.limit) {
          UPDATE += ` LIMIT ${limitSwitch.num}`;
        }
        break;
      }
      case 'DELETE':
        DELETE = `DELETE FROM ${tableName}`;
        if (whereSwitch && whereSwitch.where) {
          DELETE = whereResolve(DELETE, whereSwitch);
        }
        if (limitSwitch && limitSwitch.limit) {
          DELETE += ` LIMIT ${limitSwitch.num}`;
        }
        break;
      case 'INSERT': {
        INSERT = `INSERT INTO ${tableName}`;
        const prop = { ...sqlType.prop };

        const insertProp = Object.keys(prop);
        if (insertProp.length) {
          for (let i = 0, len = insertProp.length; i < len; i += 1) {
            const cur = insertProp[i];

            if (len === 1) {
              INSERT += `(\`${cur}\`)`;
              break;
            }
            if (i === 0) {
              INSERT += `(\`${cur}`;
            } else if (i === len - 1) {
              INSERT += `\`,\`${cur}\`)`;
            } else {
              INSERT += `\`, \`${cur}`;
            }
          }
          INSERT += ' VALUES ';
          for (let j = 0, leng = insertProp.length; j < leng; j += 1) {
            const curr = insertProp[j];
            if (prop[curr] && typeof prop[curr] === 'string') {
              prop[curr] = prop[curr].replace(/'/g, "''");
            }

            if (leng === 1) {
              INSERT += `('${prop[curr]}')`;
              break;
            }

            if (j === 0) {
              INSERT += `('${prop[curr]}`;
            } else if (j === leng - 1) {
              INSERT += `','${prop[curr]}')`;
            } else {
              INSERT += `','${prop[curr]}`;
            }
          }
        }
        break;
      }
      default:
        break;
    }
    UPDATE = UPDATE.replace(/'null'/g, null);
    INSERT = INSERT.replace(/'null'/g, null);
    return { SELECT, UPDATE, DELETE, INSERT }[sqlType.type];
  };
})();
module.exports = sqlJoin;
